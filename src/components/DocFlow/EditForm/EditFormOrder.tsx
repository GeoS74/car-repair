import { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import FileInput from "./FileInput/FileInput";
import FileLinkList from "./FileLinkList/FileLinkList"
import FileNameList from "./FileNameList/FileNameList"
import HiddenInput from "./HiddenInput/HiddenInput";
import OptionalHeader from "./OptionalHeader/OptionalHeader";
import StatusInput from "./StatusInput/StatusInput";

import InputDefault from "../../Form/Input/InputDefault";
import TextArea from "../../Form/TextArea/TextArea";
import ButtonCancel from "../../Form/ButtonCancel/ButtonCancel";
import ButtonSubmit from "../../Form/ButtonSubmit/ButtonSubmit";
import styles from "./styles.module.css"


type Props = {
  typeDoc: DocType
  doc?: IDoc
  car?: ICar
}

export default function EditForm({ typeDoc, doc, car }: Props) {

  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();

  const navigate = useNavigate()

  const [fileList, setFileList] = useState<FileList[]>([])

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

      <OptionalHeader directing={typeDoc.directing} task={typeDoc.task} {...doc} />

      <legend className="mt-3">{!doc ? "Создание заказ-наряда" : "Редактирование заказ-наряда"}</legend>

      <div className={styles.disableInputs}>
        <InputDefault
          prefix="carModel"
          label="Модель автомобиля"
          val={car?.carModel}
          disabled={true}
        />

        <InputDefault
          prefix="stateNumber"
          label="Гос. номер"
          val={car?.stateNumber}
          disabled={true}
        />

        <InputDefault
          prefix="stateNumber"
          label="VIN-код"
          val={car?.vin}
          disabled={true}
        />
      </div>

      <InputDefault
        prefix="title"
        label="Номер заявки на ремонт"
        val={doc?.title}
        errorMessage={errorMessage}
      />


      <TextArea
        prefix="description"
        label="Список неисравностей"
        val={doc?.description}
      />

      <FileLinkList docId={doc?.id} files={doc?.files} />

      <FileNameList fileList={fileList} setFileList={setFileList} errorMessage={errorMessage} />

      <FileInput errorMessage={errorMessage}
        setFileList={(file: FileList) => setFileList([...fileList, file])} />

      <HiddenInput typeDoc={typeDoc} />
      <input type="hidden" name="carId" defaultValue={car?.id} />

      <StatusInput statusCode={doc?.statusCode || 10} />

      <ButtonSubmit />

      <ButtonCancel />
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

  fileList.map(f => fd.append('scans', f[0]))

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
      return { field: "title", message: "Введите номер заявки на ремонт" }
    case "invalid directing id":
      return { field: "directSelect", message: "Не выбрано направление" }
    case "invalid task id":
      return { field: "taskSelect", message: "Не выбран тип документа" }
    case "bad mime type":
      return { field: "fileUpload", message: "Не поддерживаемый тип файлов" }
    case "invalid status code":
      return { field: "title", message: "Передан не верный статус документа" }
    default: return { field: "", message: "" }
  }
}