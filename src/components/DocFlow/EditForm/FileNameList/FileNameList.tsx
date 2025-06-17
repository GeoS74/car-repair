import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  fileList: FileList[],
  setFileList: React.Dispatch<React.SetStateAction<FileList[]>>,
  errorMessage: IErrorMessage | undefined
}

export default function FileInput({ fileList, setFileList, errorMessage }: Props) {
  return <div className={classNames("mt-4", styles.root)}>
    {fileList.length ? <><legend>Файлы:</legend><hr></hr></> : <></>}

    <ul>
      {fileList.map((f, i) => (
        <li key={i}
          onMouseEnter={_showOptionalButton}
          onMouseLeave={_showOptionalButton}
        >
          {f.item(0)?.name}

          <span hidden
            onClick={() => {
              fileList.splice(i, 1);
              setFileList([...fileList]);
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