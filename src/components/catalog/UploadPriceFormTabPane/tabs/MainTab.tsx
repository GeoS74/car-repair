import { useLoaderData } from "react-router-dom";
import classNames from "classnames";
import styles from "../styles.module.css";

export const MainTab = () => {
  /*
  * первый элемент массива исходных данных - бренды
  * второй - поставщики
  */
  const loaderData = useLoaderData() as ISimpleRow[][];

  return <>
    <div className="form-group col-sm-5">
      <label htmlFor="brandSelect" className="form-label mt-4">Бренды</label>

      <select name="brandId" className="form-select" id="brandSelect">
        <option value="0">Выберите бренд</option>
        {_makeOptions(loaderData[0])}
      </select>
    </div>

    <div className="form-group col-sm-5">
      <label htmlFor="providerSelect" className="form-label mt-4">Поставщики</label>

      <select name="providerId" className="form-select" id="providerSelect">
        <option value="0">Выберите Поставщика</option>
        {_makeOptions(loaderData[1])}
      </select>
    </div>

    <div className="form-group col-sm-5 mt-4">
    <input type="checkbox" 
      name="addNewPositionMode"
      defaultChecked={true}
      id="addNewPositionMode"
      className="form-check-input" 
      />

    <label className={classNames("form-check-label", styles.labelCheckbox)} htmlFor="addNewPositionMode">
      Добавлять новые позиции
    </label>
    </div>

    <div className="form-group col-sm-4">
      <label htmlFor="formFile" className="form-label mt-4">Прайс в формате Excel (.xls, .xlsx)</label>
      <input className="form-control" name="file" type="file" id="formFile" />
    </div>
  </>
}

function _makeOptions(brands: ISimpleRow[]) {
  return brands.map((value, index) => {
    return <option key={index} value={value.id} >
      {value.title}
    </option>
  })
}