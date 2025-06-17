import tokenManager from "../../../../libs/token.manager"
import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../middleware/response.validator"

import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  docId?: string
  files?: IStaticFile[]
}

export default function FileLinkList({ docId, files }: Props) {
  if (!files || !files.length) {
    return <></>
  }

  return <div className={classNames("mt-4", styles.root)}>
    {files.length ? <><legend>Прикреплённые файлы:</legend><hr></hr></> : <></>}

    <ul>
      {files.map((f, i) => (
        <li key={i}
          onMouseEnter={_showOptionalButton}
          onMouseLeave={_showOptionalButton}
        >
          {f.originalName}

          <span hidden
            onClick={(event) => {
              if(!confirm('Удалить файл?')){
                return;
              }
              event.currentTarget.parentElement?.remove();
              if (docId) {
                _delFile(docId, f.fileName)
              }
            }}
          ><small>удалить файл</small></span>
        </li>))}
    </ul>
  </div>
}

function _delFile(docId: string, fileName: string) {
  const fd = new FormData()
  fd.append('fileName', fileName);

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/file/${docId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        console.log(res)
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message));
}

function _showOptionalButton(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement | undefined;
  if (optionalButton) {
    optionalButton.hidden = !optionalButton.hidden;
  }
}