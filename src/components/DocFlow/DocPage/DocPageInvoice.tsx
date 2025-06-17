import { useState } from "react";

import OptionalHeaderForInvoice from "./OptionalHeader/OptionalHeaderForInvoice";
import AcceptButton from "./AcceptButton/AcceptButton";
import FileLinkedList from "./FileLinkedList/FileLinkedList";
import Author from "./Author/Author";
import AcceptorList from "./AcceptorList/AcceptorList";
import Sum from "./Sum/Sum";
import DeadLine from "./DeadLine/DeadLine";
import styles from "./styles.module.css"

export default function DocPageInvoice({...loaderDoc}: IDoc) {
  const [doc, setDoc] = useState({...loaderDoc})

  return <div className={styles.root}>
    
    <OptionalHeaderForInvoice {...doc} />

    <h3 className="mt-4">{doc.title}</h3>

    <DeadLine {...doc} />
    
    <Sum {...doc} />

    <AcceptorList {...doc}/>

    <FileLinkedList files={doc.files} />

    <AcceptButton {...doc} signatoryMode={"acceptor"} setDoc={setDoc} />

    <Author {...doc} />
  </div>
}
