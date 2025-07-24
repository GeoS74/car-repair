import { useLoaderData, useLocation } from "react-router-dom";
import session from "../../../libs/token.manager";

import DocSearchForm from "../DocSearchForm/DocSearchForm";
import DocRow from "../DocRow/Wrapper";
import NextSearch from "../NextSearch/NextSearch";
import styles from "./styles.module.css";
import { useState } from "react";

export default function DocList() {
  session.subscribe('DocList');

  const [docs, setDocs] = useState(useLoaderData() as IDoc[])
  const [showNextButton, setShowNextButton] = useState(true)
  const {state, search} = useLocation();
  const [query, setQuery] = useState(search);
  
  //  console.log(search)
  //  console.log(query)
    

/**
 * BUG DETECTED
 * 
 * переменная state может быть равна null
 * это произойдёт если перезагрузить страницу браузера
 * таким образом - не всегда понятно какой список документов отрисовывается
 * 
 */

  return <div className={styles.root} >
    <h3 className="mb-4">{state?.titleDocList || ""}</h3>

    <DocSearchForm
          setSearchResult={setDocs}
          setShowNextButton={setShowNextButton}
          setQuery={setQuery}
        />

    {docs?.map(doc => <DocRow key={doc.id} {...doc} />)}

    {docs.length > 0 && showNextButton ? 
    <NextSearch
      setDocs={(newDocs: IDoc[]) => setDocs([...docs, ...newDocs])}
      querySearch={query}
      lastId={docs[docs.length - 1]?.id}
      setShowNextButton={setShowNextButton}
    />
      : <></>}

  </div>
}



