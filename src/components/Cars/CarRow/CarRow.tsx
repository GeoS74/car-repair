import { Link } from "react-router-dom";


import classNames from "classnames"
import styles from "./styles.module.css"

export default function CarRow({ ...car }: ICar) {

  return <div className={classNames(styles.root, "mt-2")}>

    <h4 className="mt-2"> <Link to={`/cars/${car.id}`} className="nav-link">{car.carModel}</Link></h4>

    <small>гос. номер: {car.stateNumber}</small><br/>
    <small>VIN-код: {car.vin}</small><br/>
    <small>год выпуска: {car.yearProduction} </small><br/>
    <small>местонахождение: {car.place}</small>
  </div>
}
