import { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useSelector } from "react-redux";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import { toNumber } from "../../../libs/formatter";

import TitleDoc from "./TitleDoc/TitleDoc";
import FileInput from "./FileInput/FileInput";
import FileLinkList from "./FileLinkList/FileLinkList"
import FileNameList from "./FileNameList/FileNameList"
import HiddenInput from "./HiddenInput/HiddenInput";
import CancelButton from "./CancelButton/CancelButton";
import SubmitButton from "./SubmitButton/SubmitButton";
import OptionalHeaderForInvoice from "./OptionalHeader/OptionalHeaderForInvoice";
import SignatoryPanePresetDirector from "./Signatory/SignatoryPane/SignatoryPanePresetDirector";
// import DeadLine from "./DeadLine/DeadLine";
import Calendar from "../Calendar/Calendar";
import Sum from "./Sum/Sum";
import styles from "./styles.module.css"

type Props = {
  typeDoc: DocType
  doc?: IDoc
}

export default function EditForm({ doc, typeDoc }: Props) {
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();

  const navigate = useNavigate()

  const [fileList, setFileList] = useState<FileList[]>([]);
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme;


  return <form className={styles.root}
    onSubmit={event => _onSubmit(
      event,
      setDisabled,
      setErrorResponse,
      fileList,
      navigate,
      doc
    )}
  >
    <fieldset disabled={disabled} className="form-group">

      <OptionalHeaderForInvoice directing={typeDoc.directing} task={typeDoc.task} />

      <legend className="mt-3">{!doc ? "Создание счёта" : "Изменение счёта"}</legend>

      <TitleDoc
        errorMessage={errorMessage}
        title={doc?.title}
        label="Номер и дата счёта"
      />
      {/* 
      <DeadLine
        deadLine={doc?.deadLine}
        errorMessage={errorMessage}
      /> */}

      <Calendar
        stylesCalendar={theme}
        deadLine={doc?.deadLine}
      />

      <Sum
        sum={doc?.sum}
        errorMessage={errorMessage}
      />

      <FileLinkList docId={doc?.id} files={doc?.files} />

      <FileNameList fileList={fileList} setFileList={setFileList} errorMessage={errorMessage} />

      <FileInput errorMessage={errorMessage}
        setFileList={(file: FileList) => setFileList([...fileList, file])} />

      <SignatoryPanePresetDirector typeDoc={typeDoc} />

      <HiddenInput typeDoc={typeDoc} />

      <SubmitButton />

      <CancelButton />
    </fieldset>
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  fileList: FileList[],
  navigate: NavigateFunction,
  doc?: IDoc
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

  fileList.map(f => fd.append('scans', f[0]));

  // корректировка ввода ссуммы
  fd.set('sum', toNumber(fd.get('sum') as string).toString() || "");

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/${doc?.id || ''}`, {
    method: doc ? 'PATCH' : 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        return navigate(`/docflow/${res.id}`)
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
    case "invalid title":
      return { field: "title", message: "Поле не заполнено" }
    case "invalid directing id":
      return { field: "directSelect", message: "Не выбрано направление" }
    case "invalid task id":
      return { field: "taskSelect", message: "Не выбран тип документа" }
    case "bad mime type":
      return { field: "fileUpload", message: "Не поддерживаемый тип файлов" }
    case "invalid sum":
      return { field: "sum", message: "Не корректный формат суммы" }
    case "invalid deadLine":
      return { field: "deadLine", message: "Не корректный формат даты" }
    default: return { field: "", message: "" }
  }
}
