import { useState } from "react";
import { useNavigate, NavigateFunction, useLoaderData } from "react-router-dom";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"

import Input from "./Input/Input";
import CancelButton from "./CancelButton/CancelButton";
import SubmitButton from "./SubmitButton/SubmitButton";
import styles from "./styles.module.css"

export default function EditForm() {
  const car = useLoaderData() as ICar;


  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();

  const navigate = useNavigate();

  return <form className={styles.root}
    onSubmit={event => _onSubmit(
      event,
      setDisabled,
      setErrorResponse,
      navigate,
      car
    )}
  >
    <fieldset disabled={disabled} className="form-group">

      {/* <OptionalHeader directing={typeDoc.directing} task={typeDoc.task} {...doc} /> */}

      <legend className="mt-3">{!car ? "Добавление автомобиля" : "Изменение автомобиля"}</legend>

      <Input
        prefix="carModel"
        label="Модель автомобиля"
        val={car?.carModel}
        errorMessage={errorMessage} />

      <Input
        prefix="stateNumber"
        label="Гос. номер"
        val={car?.stateNumber}
        errorMessage={errorMessage} />

      <Input
        prefix="vin"
        label="VIN-code"
        val={car?.vin}
        errorMessage={errorMessage} />

      <Input
        prefix="yearProduction"
        label="Год выпуска"
        val={car?.yearProduction}
        errorMessage={errorMessage} />

      <Input
        prefix="place"
        label="Местонахождение автомобиля"
        val={car?.place}
        errorMessage={errorMessage} />

      <SubmitButton />

      <CancelButton />
    </fieldset>
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  navigate: NavigateFunction,
  car?: ICar
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/cars/${car?.id || ''}`, {
    method: car ? 'PATCH' : 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        return navigate(`/cars/${res.id}`)
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
  if (error.indexOf('Не уникальное значение vin') !== -1)
    return { field: "vin", message: "VIN-код должен быть уникальным" }

  if (error.indexOf('Не уникальное значение stateNumber') !== -1)
    return { field: "stateNumber", message: "Гос. номер должен быть уникальным" }

  switch (error) {
    case "invalid car model":
      return { field: "carModel", message: "Введите название модели" }
    case "invalid state number":
      return { field: "stateNumber", message: "Введите гос. номер" }
    case "invalid vin code":
      return { field: "vin", message: "VIN-код не корректен" }
    default: return { field: "", message: "" }
  }
}