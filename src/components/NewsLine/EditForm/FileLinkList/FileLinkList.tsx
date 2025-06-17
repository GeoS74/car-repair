import { useState } from "react"
import styles from "./styles.module.css"
import classNames from "classnames";

import tokenManager from "../../../../libs/token.manager"
import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../middleware/response.validator"



type Props = {
  docId?: string
  files?: IStaticFile[]
}

export default function FileLinkList({ docId, files }: Props) {
  const [hiddenimageTag, setHiddenImageTag] = useState(true)

  if (!files || !files.length) {
    return <></>
  }

  return <div className={classNames("mt-4", styles.root)}>
    {files.length ? <><legend>Прикреплённые файлы:</legend><hr></hr></> : <></>}

    <div>
      <img src=""
        alt="foto"
        id="imageFileLinkList"
        className={styles.image}
        hidden={hiddenimageTag}
        onClick={() => setHiddenImageTag(true)}
      />
    </div>

    <ul>
      {files.map((file, index) => (
        <li key={index}
          onClick={(event) => _showImage(file, event, setHiddenImageTag)}
          onMouseEnter={_showOptionalButton}
          onMouseLeave={_showOptionalButton}
        >
          {file.originalName}

          <span hidden
            onClick={(event) => {
              if (!confirm('Удалить файл?')) {
                return;
              }
              event.currentTarget.parentElement?.remove();
              if (docId) {
                _delFile(docId, file.fileName, setHiddenImageTag)
                setHiddenImageTag(true)
              }
            }}
          ><small>удалить файл</small></span>
        </li>))}
    </ul>
  </div>
}

function _delFile(docId: string, fileName: string, setHiddenImageTag: React.Dispatch<React.SetStateAction<boolean>>) {
  const fd = new FormData()
  fd.append('fileName', fileName);

  fetchWrapper(() => fetch(`${serviceHost('mnote')}/api/mnote/file/${docId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const tagImageId = document.getElementById('imageFileLinkList')
        if (tagImageId) {
          setHiddenImageTag(true)
        }
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message));
}

function _showOptionalButton(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement | undefined;
  if (optionalButton) {
    event.type === "mouseleave" ? optionalButton.hidden = true : optionalButton.hidden = false
  }
}

function _showImage(
  file: IStaticFile,
  event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  setHiddenImageTag: React.Dispatch<React.SetStateAction<boolean>>) {
  const tagImageId = document.getElementById('imageFileLinkList')
  if (tagImageId && event.target === event.currentTarget) {
    setHiddenImageTag(false)
    tagImageId.setAttribute('src', `${serviceHost('mnote')}/api/mnote/static/images/${file.fileName}`)
  }
}