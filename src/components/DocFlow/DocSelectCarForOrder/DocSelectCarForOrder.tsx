import { useState, useEffect } from "react";

import serviceHost from "../../../libs/service.host";
import fetchWrapper from "../../../libs/fetch.wrapper";
import tokenManager from "../../../libs/token.manager";
import { responseNotIsArray } from "../../../middleware/response.validator";
import CancelButton from "../EditForm/CancelButton/CancelButton";
import EditFormOrfer from '../EditForm/EditFormOrder';
import SelectCarList from "./SelectCarList";
import classNames from "classnames";
import styles from "./styles.module.css";

type Props = {
  typeDoc: DocType
  doc?: IDoc
}

export default function DocSelectCarForOrder({ typeDoc, doc }: Props) {
  const [currentCar, setCurrentCar] = useState<ICar | undefined>(doc?.car);
  const [cars, setCars] = useState<ICar[]>([]);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => setMouseDown(false))

  if (currentCar) {
    return <EditFormOrfer typeDoc={typeDoc} doc={doc} car={currentCar}/>
  }

  return <div
    className={classNames(styles.root, "mt-4")}
    onMouseDown={() => setMouseDown(true)}
  >
    <legend>Выбор автомобиля</legend>

    <label htmlFor="searchCarInput" className="form-label mt-4">Укажите автомобиль из списка для заявки</label>
    <input type="text"
      className="form-control"
      id="searchCarInput"
      placeholder="начните вводить гос.номер или VIN"
      autoComplete="off"

      // срабатывает если фокус на input-е и автомобиль ещё не выбран
      onFocus={(event) => {
        if (!currentCar) {
          _searchCar(event, setCars)
        }
      }}

      onInput={(event) => _searchCar(event, setCars)}

      onBlur={() => {
        if (mouseDown) return;

        if (cars.length) {
          setCars([])
        }
      }}
    />

    <SelectCarList
      cars={cars}
      setCurrentCar={setCurrentCar}
    />

    <CancelButton />
  </div>

}

function _searchCar(
  event: React.FormEvent<HTMLInputElement>,
  setCars: React.Dispatch<React.SetStateAction<ICar[]>>,
) {

  if (!event.currentTarget.value) {
    return;
  }

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/cars/search/car/?search=${event.currentTarget.value}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        setCars(res);
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => {
      console.log(error.message);
      setCars([]);
    })
}