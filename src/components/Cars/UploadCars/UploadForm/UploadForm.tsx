import { useState } from "react";

import fetchWrapper from "../../../../libs/fetch.wrapper";
import serviceHost from "../../../../libs/service.host";
import tokenManager from "../../../../libs/token.manager";
import { responseNotIsArray } from "../../../../middleware/response.validator";

import InputDefault from "../../../Form/Input/InputDefault";
import InputFile from "../../../Form/InputFile/InputFile";
import ButtonSubmit from "../../../Form/ButtonSubmit/ButtonSubmit";
import ButtonCancel from "../../../Form/ButtonCancel/ButtonCancel";
import styles from "./styles.module.css";

type Props = {
  setUploadCarsComplete: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UploadForm({ setUploadCarsComplete }: Props) {

  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();

  return <form className={styles.root}
    onSubmit={event => _onSubmit(
      event,
      setDisabled,
      setErrorResponse,
      setUploadCarsComplete,
    )}
  >
    <fieldset disabled={disabled} className="form-group">

      <legend className="mt-3">{"Укажите параметры Excel"}</legend>

      <InputDefault
        prefix="carModelField"
        label="Столбец: модель автомобиля (буква или цифра)"
        placeholder="A"
        errorMessage={errorMessage} />

      <InputDefault
        prefix="vinField"
        label="Столбец: VIN-код (буква или цифра)"
        placeholder="B"
        errorMessage={errorMessage} />

      <InputDefault
        prefix="stateNumberField"
        label="Столбец: гос. номер (буква или цифра)"
        placeholder="C"
        errorMessage={errorMessage} />

      <InputDefault
        prefix="placeField"
        label="Столбец: место приписки (буква или цифра)"
        placeholder="D"
        errorMessage={errorMessage} />

      <InputDefault
        prefix="yearProductionField"
        label="Столбец: год выпуска (буква или цифра)"
        placeholder="E"
        errorMessage={errorMessage} />

      <hr />
      <div className={styles.wrapInput}>
        <InputDefault
          prefix="startRow"
          label="Начальная строка:"
          placeholder="1"
          val={"1"}
          errorMessage={errorMessage} />

        <InputDefault
          prefix="endRow"
          label="Конечная строка:"
          placeholder=" "
          errorMessage={errorMessage} />
      </div>

      <InputFile
        prefix="carsListFile"
        label="Файл в формате .xslx"
        errorMessage={errorMessage} />


      <div></div>

      <ButtonSubmit val={"Загрузить"} />
      <ButtonCancel />
    </fieldset>
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  setUploadCarsComplete: React.Dispatch<React.SetStateAction<boolean>>,
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget);

  const fileInput = fd.get('carsListFile');
  if (fileInput instanceof File) {
    if (fileInput.size === 0) {
      fd.delete('carsListFile');
    }
  }

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/cars/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        setUploadCarsComplete(false); // загрузка стартовала
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
    .finally(() => {
      setDisabled(false);
    });
}

function _getErrorResponse(error: string): IErrorMessage {
  switch (error) {
    case "carModelField is empty":
      return { field: "carModelField", message: "Столбец не указан" }
    case "vinField is empty":
      return { field: "vinField", message: "Столбец не указан" }
    case "stateNumberField is empty":
      return { field: "stateNumberField", message: "Столбец не указан" }
    case "file not uploaded":
      return { field: "carsListFile", message: "Excel файл не выбран" }
    case "field name \"carsListFile\" is empty":
      return { field: "carsListFile", message: "Excel файл не выбран" }
    case "file must be in excel format":
      return { field: "carsListFile", message: "файл должен быть в формате Excel (.xslx)" }
    default: return { field: "", message: "" }
  }
}