import { ErrorMessage } from "../ErrorMessage/ErrorMessage"

import { ReactComponent as UploadIcon } from "./image/file-earmark-arrow-up.svg"
import classNames from "classnames"
import styles from "./styles.module.css"

type Props = {
  errorMessage: IErrorMessage | undefined
  setFileList: (file: FileList) => void
}

export default function FileInput({ errorMessage, setFileList }: Props) {
  return <div>
    <div className={classNames("form-group mt-4", styles.root)}
      onClick={event => (event.currentTarget.querySelector('input') as HTMLElement).click()}
      onDrop={event => {
        event.preventDefault()
        setFileList(event.dataTransfer.files)
      }}
      onDragEnter={event => event.preventDefault()}
      onDragOver={event => event.preventDefault()}
    >

      <p className="mt-3">
        <UploadIcon width="25" height="25" />
        <small>Прикрепить файл</small></p>

      <input type="file" onChange={event => _change(event, setFileList)} hidden />

    </div>
    {errorMessage?.field === "fileInput" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </div>
}

function _change(
  event: React.ChangeEvent<HTMLInputElement>,
  setFileList: (file: FileList) => void
) {
  const files = event.currentTarget.files

  if (files) {
    setFileList(files);
  }

}
