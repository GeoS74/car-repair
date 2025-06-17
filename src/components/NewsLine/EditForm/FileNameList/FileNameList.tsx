import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import styles from "./styles.module.css"
import classNames from "classnames";
import { useState } from "react"

type fileListProps = {
  fileList: FileList,
  fileImage: string
}

type Props = {
  fileList: fileListProps[],
  setFileList: React.Dispatch<React.SetStateAction<fileListProps[]>>,
  errorMessage: IErrorMessage | undefined
}

export default function FileInput({ fileList, setFileList, errorMessage }: Props) {
  const [hiddenimageTag, setHiddenImageTag] = useState(true)
  return <div className={classNames("mt-4", styles.root)}>
    {fileList.length ? <><legend>Файлы:</legend><hr></hr></> : <></>}
    <div>
      <img src="" 
           alt="foto" 
           id="imgFileNameList" 
           className={styles.image} 
           hidden={hiddenimageTag} 
           onClick={() => setHiddenImageTag(true)}
      />
    </div>
    <ul>
      {fileList.map((file, index) => (
        <li key={index}
        onClick={(event) => _showImage(file, event, setHiddenImageTag)}
          onMouseEnter={_showOptionalButton}
          onMouseLeave={_showOptionalButton}
        >
          {file.fileList.item(0)?.name}

          <span hidden
            onClick={() => {                          
              fileList.splice(index, 1);
              setFileList([...fileList]);
              setHiddenImageTag(true);
            }}
          ><small>удалить файл</small></span>
        </li>))}
    </ul>
    {errorMessage?.field === "fileUpload" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </div>
}

function _showOptionalButton(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement | undefined;
  if (optionalButton) {
    optionalButton.hidden = !optionalButton.hidden;
  }
}

function _showImage(
  file: fileListProps, 
  event: React.MouseEvent<HTMLLIElement, MouseEvent>, 
  setHiddenImageTag: React.Dispatch<React.SetStateAction<boolean>>) {
  const tagImageId = document.getElementById('imgFileNameList')
  if (tagImageId && event.target === event.currentTarget) {
    setHiddenImageTag(false)    
    tagImageId.setAttribute('src', file.fileImage)  
  }
}