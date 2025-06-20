import { useState } from "react";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
// import FileInput from "./FileInput/FileInput";
// import FileLinkList from "./FileLinkList/FileLinkList"
// import FileNameList from "./FileNameList/FileNameList"
import styles from "./styles.module.css"
import SubmitButton from "./SubmitButton/SubmitButton";
import TextComment from "./TextComment/TextComment";


type Props = {
 docId: string,
 addComment: (comment: IComment) => void
}

export default function EditForm({ docId, addComment }: Props) {
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();

  // const [fileList, setFileList] = useState<FileList[]>([])

  return <form className={styles.root}
    onSubmit={event => _onSubmit(
      event,
      setDisabled,
      setErrorResponse,
      // fileList,
      addComment
    )}
  >
    <fieldset disabled={disabled} className="form-group">

      {/* <legend className="mt-3">Комментарий</legend> */}

      <TextComment errorMessage={errorMessage}/>

      {/* <FileLinkList docId={doc?.id} files={doc?.files} />
      <FileNameList fileList={fileList} setFileList={setFileList} errorMessage={errorMessage} />
      <FileInput errorMessage={errorMessage}
        setFileList={(file: FileList) => setFileList([...fileList, file])} /> */}

      <input type="hidden" name="docId" defaultValue={docId} />

      <SubmitButton />
    </fieldset>
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  // fileList: FileList[],
  addComment: (comment: IComment) => void
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

  // fileList.map(f => fd.append('scans', f[0]));

  

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
        addComment(res)
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
    default: return { field: "commentTextarea", message: "" }
  }
}