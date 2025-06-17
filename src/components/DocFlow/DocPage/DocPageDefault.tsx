import { useState } from "react";

import OptionalHeader from "./OptionalHeader/OptionalHeader";
import AcceptButton from "./AcceptButton/AcceptButton";
import FileLinkedList from "./FileLinkedList/FileLinkedList";
import Description from "./Description/Description";
import Author from "./Author/Author";
import styles from "./styles.module.css"
import AcceptorList from "./AcceptorList/AcceptorList";
import RecipientList from "./RecipientList/RecipientList";

export default function DocPageDefault({...loaderDoc}: IDoc) {
  const [doc, setDoc] = useState({...loaderDoc})

  return <div className={styles.root}>
    {/* <div className={styles.linkAndTitle}>
      <BackArrow />
      <small>{doc.directing.title} / {doc.task.title}</small>      
    </div> */}

    <OptionalHeader {...doc} />

    <h3 className="mt-4">{doc.title}</h3>

    <Description {...doc} />

    <AcceptorList {...doc}/>
    <RecipientList {...doc}/>

    <FileLinkedList files={doc.files} />

    <AcceptButton {...doc} signatoryMode={"acceptor"} setDoc={setDoc} />
    <AcceptButton {...doc} signatoryMode={"recipient"} setDoc={setDoc} />

    <Author {...doc} />
  </div>
}
