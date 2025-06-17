import { useState } from "react";

import serviceHost from "../../../libs/service.host"
import styles from "./styles.module.css"
import { ReactComponent as Icon } from "./image/filetype-xlsx.svg"
import Processed from "../Processed/Processed";

export default function DownloadPrice() {
    const [downloadState, setDownloadState] = useState("new");

    return <div className={styles.root}>
        <h3 className="mb-4">Скачать прайс</h3>

        <DialogPane downloadState={downloadState} setDownloadState={setDownloadState} />
    </div>
}

function DialogPane({ downloadState, setDownloadState }: {
    downloadState: string,
    setDownloadState: React.Dispatch<React.SetStateAction<string>>,
}) {
    switch (downloadState) {
        case 'processed': return <Processed stateString={"Формирование прайса, пожалуйста подождите"}/>
        case 'complete': return <p>Скачивание прайса завершено. <span className={styles.linker} onClick={() => setDownloadState('new')}>Скачать ещё раз?</span> </p>
        case 'error': return <p>Что-то пошло не так, попробуем ещё?</p>
        default: return <p onClick={event => _downloadPrice(event, setDownloadState)} className={styles.linker}> <Icon width="50" height="50" /> Скачать прайс в формате Excel</p>
    }
}

async function _downloadPrice(
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    setDownloadState: React.Dispatch<React.SetStateAction<string>>
) {
    event.preventDefault();
    setDownloadState('processed');

    await new Promise(res => setTimeout(() => res(1), 2000));

    fetch(`${serviceHost("bridge")}/api/bridge/file/download`)
        .then(async response => {
            if (response.ok) {
                const contentType = response.headers.get('content-type') || undefined;

                const res = await response.blob();
                const file = new Blob([res], { type: contentType });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(file);
                a.download = _makePriceName(contentType);
                a.click();
                setDownloadState('complete');
                return;
            }
            throw new Error(`response status: ${response.status}`)
        })
        .catch(error => {
            setDownloadState('error');
            console.log(error.message)
        })
}

function _makePriceName(contentType?: string) {
    const date = new Date();
    let month: number | string = (date.getMonth() + 1);
    if (month < 10) {
        month = '0' + month;
    }

    const fname = `Прайс от ${date.getFullYear()}-${month}-${date.getDate()}`;
    switch (contentType) {
        case 'application/vnd.ms-excel':
            return `${fname}.xls`
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return `${fname}.xlsx`
        default:
            throw new Error('bad content-type');
    }
}