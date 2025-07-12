import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import session from "../../../libs/token.manager";
import UploadForm from "./UploadForm/UploadForm";
import UploadInfo from "./UploadInfo/UploadInfo";
import styles from "./styles.module.css";

export default function UploadCars() {
  session.subscribe('UploadCars');

  const state = useLoaderData() as {message: string};

  const [uploadCarsComplete, setUploadCarsComplete] = useState(state.message === 'загрузка файла завершена');

  return <div className={styles.root} >
    <h3 className="mb-4">Загрузка списка автомобилей из Excel</h3>

    {uploadCarsComplete ?
      <UploadForm setUploadCarsComplete={setUploadCarsComplete} /> :
      <UploadInfo />
    }
  </div>
}