import { ErrorMessage } from "../ErrorMessage/ErrorMessage"

import { ReactComponent as UploadIcon } from "./image/file-earmark-arrow-up.svg"
import classNames from "classnames"
import styles from "./styles.module.css"

type Props = {
  errorMessage: IErrorMessage | undefined
  setFileList: (file: fileListProps) => void
}

type fileListProps = {
  fileList: FileList,
  fileImage: string
}

export default function FileInput({ errorMessage, setFileList }: Props) {
  return <div className={classNames("form-group mt-4", styles.root)}
    onClick={event => (event.currentTarget.querySelector('input') as HTMLElement).click()}
    onDrop={event => {
      event.preventDefault()
      setFileList({fileList: event.dataTransfer.files, fileImage: URL.createObjectURL(event.dataTransfer.files?.[0])})
    }}
    onDragEnter={event => event.preventDefault()}
    onDragOver={event => event.preventDefault()}
  >

    <p className="mt-4">
      <UploadIcon width="50" height="50" />
      <small>Добавить файл</small></p>

    <input type="file"  accept="image/*" onChange={event => _change(event, setFileList)} hidden />
    {errorMessage?.field === "file" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </div>
}

function _change(
  event: React.ChangeEvent<HTMLInputElement>,
  setFileList: (file: fileListProps) => void
) {
  const files = event.currentTarget.files
  if (event.currentTarget.files?.[0] !== undefined && files) {
    const tempObjectFiles = {fileList: files, fileImage: URL.createObjectURL(event.currentTarget.files?.[0])}
    setFileList(tempObjectFiles)
  }

}
