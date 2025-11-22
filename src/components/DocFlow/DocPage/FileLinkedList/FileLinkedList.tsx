import classNames from "classnames";
import serviceHost from "../../../../libs/service.host";

import fetchWrapper from "../../../../libs/fetch.wrapper";
import tokenManager from "../../../../libs/token.manager";
import { responseNotIsArray } from "../../../../middleware/response.validator";
import { ReactComponent as FileIcon } from "./image/file-earmark-text.svg";
import styles from "./styles.module.css";

type Props = {
  files: IStaticFile[],
  statusCode?: number
}

export default function FileLinkedList({ files, statusCode }: Props) {
  if(statusCode && statusCode > 60) {
    return <div className={classNames(styles.root, "mb-4")}>
        {files.length ? <p className="mt-4">Прикреплённые файлы:</p> : <></>}
        <ul>
          {files.map((file, i) => {
            return <li 
              key={file.fileName + i} 
              className={styles.link}
              onClick={() => _downloadFile(file.fileName)}
            >
              <FileIcon width="25" height="25" />

              {file.originalName}
            </li>
          })}
        </ul>
      </div>
    }

  return <div className={classNames(styles.root, "mb-4")}>
    {files.length ? <p className="mt-4">Прикреплённые файлы:</p> : <></>}
    <ul>
      {files.map((file, i) => {
        return <li 
          key={file.fileName + i} 
          className={styles.link}
        >
          <FileIcon width="25" height="25" />

          <a
            // className="text-muted"
            href={`${serviceHost('informator')}/api/informator/docflow/scan/${file.fileName}`}
            download={file.originalName}
            target="_blank"
            rel="noopener noreferrer"
          >{file.originalName}</a>
        </li>
      })}
    </ul>
  </div>
}

function _downloadFile(fname: string) {
fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/download/scan/${fname}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.blob();

        const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'test.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}