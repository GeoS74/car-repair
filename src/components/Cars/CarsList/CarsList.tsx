import { useLoaderData } from "react-router-dom";
import session from "../../../libs/token.manager";
import styles from "./styles.module.css";
import { useState } from "react";
import CarSearchForm from "../CarSearchForm/CarSearchForm";
import CarRow from "../CarRow/CarRow";
import NextSearch from "../NextSearch/NextSearch";
import AddCarButton from "../AddCarButton/AddCarButton";

export default function CarsList() {
  session.subscribe('CarsList');

  const [cars, setCars] = useState(useLoaderData() as ICar[]);
  const [showNextButton, setShowNextButton] = useState(true);
  const [query, setQuery] = useState('');

  return <div className={styles.root} >
    {/* <h3 className="mb-4">Список автомобилей</h3> */}

     

    <CarSearchForm
      setSearchResult={setCars}
      setShowNextButton={setShowNextButton} 
      setQuery={setQuery}
      />

      <AddCarButton />

    {cars?.map(car => <CarRow key={car.id} {...car} />)}

    {cars.length > 0 && showNextButton ?
      <NextSearch
        setCars={(newCars: ICar[]) => setCars([...cars, ...newCars])}
        querySearch={query}
        lastId={cars[cars.length - 1]?.id}
        setShowNextButton={setShowNextButton}
      />
      : <></>}

  </div>
}



