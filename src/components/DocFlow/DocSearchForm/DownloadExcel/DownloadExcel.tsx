import { useState } from "react";
import { ReactComponent as Icon } from "./image/filetype-xlsx.svg";
import { ReactComponent as Rotate } from "./image/rotate.svg";

import fetchWrapper from "../../../../libs/fetch.wrapper";
import serviceHost from "../../../../libs/service.host";
import tokenManager from "../../../../libs/token.manager";
import { responseNotIsArray } from "../../../../middleware/response.validator";

import classNames from "classnames";
import styles from "./styles.module.css"

export default function DownloadExcel() {
  const [isDownload, setIsDownload] = useState(false);

  return <div className={classNames(styles.root)}>

    {isDownload ?
      <Rotate width="25" height="25" /> :
      <Icon width="25" height="25"
        onClick={(event) => _downloadFile(event, setIsDownload)}
      />
    }
  </div>
}

function _makeQueryString(fd: FormData) {
  const query = [];

  if (fd.get('query')) {
    query.push(`search=${fd.get('query')}`);
  }
  if (fd.get('statusCode')) {
    query.push(`statusCode=${fd.get('statusCode')}`);
  }
  if (fd.get('directing')) {
    query.push(`directing=${fd.get('directing')}`);
  }
  if (fd.get('author')) {
    query.push(`author=1`);
  }
  if (fd.get('calendar')) {
    query.push(`calendar=${fd.get('calendar')}`);
  }

  return '?' + query.join('&');
}

async function _downloadFile(
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  setIsDownload: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsDownload(true);
  const fd = new FormData(event?.currentTarget.parentNode?.parentNode?.parentNode as HTMLFormElement);
  const query = _makeQueryString(fd);

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/download/doccar/${query}`, {
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
        a.download = 'БОВИД - ремонты.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setIsDownload(false));
}
