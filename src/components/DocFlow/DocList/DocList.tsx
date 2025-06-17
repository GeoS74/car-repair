import { useLoaderData, useLocation } from "react-router-dom";
import session from "../../../libs/token.manager";
import DocRow from "../DocRow/Wrapper";
import NextSearch from "../NextSearch/NextSearch";
import styles from "./styles.module.css";
import { useState } from "react";

export default function DocList() {
  session.subscribe('DocList');

  const [docs, setDocs] = useState(useLoaderData() as IDoc[])
  const [showNextButton, setShowNextButton] = useState(true)
  const {state, search} = useLocation();

/**
 * BUG DETECTED
 * 
 * переменная state может быть равна null
 * это произойдёт если перезагрузить страницу браузера
 * таким образом - не всегда понятно какой список документов отрисовывается
 * 
 */

  return <div className={styles.root} >
    <h3 className="mb-4">Документы {state?.titleDocList || ""}</h3>

    {docs?.map(doc => <DocRow key={doc.id} {...doc} />)}

    {docs.length > 0 && showNextButton ? 
    <NextSearch
      setDocs={(newDocs: IDoc[]) => setDocs([...docs, ...newDocs])}
      querySearch={search}
      lastId={docs[docs.length - 1]?.id}
      setShowNextButton={setShowNextButton}
    />
      : <></>}

  </div>
}



