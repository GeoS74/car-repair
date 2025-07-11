import { useState } from "react";
import session from "../../../libs/token.manager";

import UploadForm from "./UploadForm/UploadForm";
import UploadInfo from "./UploadInfo/UploadInfo";
import styles from "./styles.module.css";

export default function UploadCars() {
  session.subscribe('UploadCars');

  const [isUploadCars, setIsUploadCars] = useState<UploadExcelState>('notUpload');

  return <div className={styles.root} >
    <h3 className="mb-4">Загрузка списка автомобилей из Excel</h3>

    {isUploadCars === 'notUpload' ?
      <UploadForm setIsUploadCars={setIsUploadCars} /> :
      <UploadInfo isUploadCars={isUploadCars} />
    }
  </div>
}