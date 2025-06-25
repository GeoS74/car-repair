import { useLoaderData } from "react-router-dom";

import OptionalHeader from "./OptionalHeader/OptionalHeader";
import styles from "./styles.module.css"


export default function CarPage() {
  const car = useLoaderData() as ICar;

  return <div className={styles.root}>

    <OptionalHeader {...car} />

    <h3 className="mt-4">{car.carModel}</h3>
    <p>Гос. номер: {car.stateNumber}</p>
    <p>VIN-код: {car.vin}</p>
    <p>Год выпуска: {car.yearProduction}</p>
    <p>Местонахождение: {car.place}</p>
  </div>
}
