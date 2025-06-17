import { useState } from "react";

import UploadPriceForm from "../UploadPriceForm/UploadPriceForm";
import styles from "./styles.module.css"
import Processed from "../Processed/Processed";

export default function UploadPrice() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [uploadState, setUploadState] = useState("new")

  return <div className={styles.root}>
    <h3>Загрузка прайса</h3>

    {error ? <p>{_getErrorResponse(error)} <span onClick={() => {
      setError(undefined)
      setUploadState("new")
    }}>Попробуем ещё?</span></p> :

    uploadState === "upload" ?
    <Processed stateString={"Загрузка прайса"}/> :

        uploadState === "end" ?
          <p>файл успешно загружен.<span onClick={() => setUploadState("new")}>Загрузить ещё?</span></p> :

          <UploadPriceForm setError={setError} setUploadState={setUploadState} />
    }
  </div>
}

function _getErrorResponse(error: string) {
  switch (error) {
    case "field name \"file\" is empty":
    case "файл Excel не получен":
      return "Ошибка: файл не загружен"

    case "brand not found":
      return "Ошибка: не выбран бренд прайса"

    case "provider not found":
      return "Ошибка: не выбран поставщик"
    default: return "";
  }
}