import { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "../../../store/index";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import TextPane from "./TextPane/TextPane";
import TitleDoc from "./TitleDoc/TitleDoc";
import FileInput from "./FileInput/FileInput";
import FileLinkList from "./FileLinkList/FileLinkList"
import FileNameList from "./FileNameList/FileNameList"
import HiddenInput from "./HiddenInput/HiddenInput";
import CancelButton from "./CancelButton/CancelButton";
import styles from "./styles.module.css"
import SubmitButton from "./SubmitButton/SubmitButton";
import OptionalHeader from "./OptionalHeader/OptionalHeader";
import StatusInput from "./StatusInput/StatusInput";
import TextComment from "./TextComment/TextComment";


type Props = {
 docId: string
}

export default function EditForm({ docId }: Props) {

  const status = useSelector((state: StoreState) => state.status.items);

  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();

  const navigate = useNavigate()

  const [fileList, setFileList] = useState<FileList[]>([])

  return <form className={styles.root}
    onSubmit={event => _onSubmit(
      event,
      setDisabled,
      setErrorResponse,
      fileList
    )}
  >
    <fieldset disabled={disabled} className="form-group">

      {/* <legend className="mt-3">Комментарий</legend> */}

      <TextComment />

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
  fileList: FileList[]
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

  fileList.map(f => fd.append('scans', f[0]))

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
        console.log(res);
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
}

function _getErrorResponse(error: string): IErrorMessage {
  switch (error) {
    case "bad mime type":
      return { field: "commentTextarea", message: "Не поддерживаемый тип файлов" }
    default: return { field: "commentTextarea", message: "" }
  }
}