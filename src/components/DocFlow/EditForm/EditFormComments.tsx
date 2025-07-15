import { useState } from "react";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import FileInput from "./FileInput/FileInput";
import FileNameList from "./FileNameList/FileNameList"
import styles from "./styles.module.css"
import SubmitButton from "./SubmitButton/SubmitButton";
import TextComment from "./TextComment/TextComment";


type Props = {
  docId: string,
  addComment: (comment: IComment) => void
  setFiles: (files: IStaticFile[]) => void
}

export default function EditForm({ docId, addComment, setFiles }: Props) {

  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();

  const [fileList, setFileList] = useState<FileList[]>([])

  return <form className={styles.root}
    onSubmit={event => _onSubmit(
      event,
      setDisabled,
      setErrorResponse,
      addComment,
      setFiles,
      fileList,
      setFileList
    )}
  >
    <fieldset disabled={disabled} className="form-group">

      {/* <legend className="mt-3">Комментарий</legend> */}

      <TextComment errorMessage={errorMessage} />

      <input type="hidden" name="docId" defaultValue={docId} />

      <FileNameList fileList={fileList} setFileList={setFileList} errorMessage={errorMessage} />
      <FileInput errorMessage={errorMessage}
        setFileList={(file: FileList) => setFileList([...fileList, file])} />

      <SubmitButton />
    </fieldset>
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  addComment: (comment: IComment) => void,
  setFiles: (files: IStaticFile[]) => void,
  fileList: FileList[],
  setFileList: React.Dispatch<React.SetStateAction<FileList[]>>
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

  fileList.map(f => fd.append('scans', f[0]));

  // сброс состояния формы, т.к. форма не размонтируется при добавлении комментария
  // и автоматического обнуления состояния не происходит
  setFileList([]);
  setErrorResponse(_getErrorResponse(""))

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/doccomments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();

        addComment(res);
        if (res.files.length) {
          setFiles(res.files);
        }
        return;
      }
      else if (response.status === 400) {
        const res = await response.json()
        setErrorResponse(_getErrorResponse(res.error))
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));

  event.currentTarget.reset();

}

function _getErrorResponse(error: string): IErrorMessage {
  switch (error) {
    case "bad mime type":
      return { field: "commentTextarea", message: "Не поддерживаемый тип файлов" }
    case "comment not be empty":
      return { field: "commentTextarea", message: "Комментарий не содержит данных" }
    default: return { field: "commentTextarea", message: "" }
  }
}