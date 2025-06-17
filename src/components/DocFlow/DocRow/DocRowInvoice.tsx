import { Link } from "react-router-dom";
import { useState } from "react";

import OptionalHeaderForInvoice from "./OptionalHeader/OptionalHeaderForInvoice";
import FileLinkedList from "../DocPage/FileLinkedList/FileLinkedList";
import Description from "../DocPage/Description/Description";
import Author from "../DocPage/Author/Author";
import RequiredToSign from "./RequiredToSign/RequiredToSign";
import AcceptButton from "../DocPage/AcceptButton/AcceptButton";
import Sum from "../DocPage/Sum/Sum";
import DeadLine from "../DocPage/DeadLine/DeadLine";
import classNames from "classnames"
import styles from "./styles.module.css"

export default function DocRow({ ...doc }: IDoc) {

  // этот стейт нужен для возможности подписания документа прямо из списка
  const [row, setRow] = useState({...doc})

  return <div className={classNames(styles.root, "mt-2")}>

    <OptionalHeaderForInvoice {...doc} />

    <h4 className="mt-2"><Link to={`/docflow/${doc.id}`} className="nav-link">{doc.title}</Link></h4>

    <DeadLine {...doc} />
    
    <Sum {...doc} />

    <Description {...doc} limit={350} />

    <FileLinkedList files={doc.files} />

    <RequiredToSign {...row} signatoryMode={"acceptor"}/>

    <AcceptButton {...row} signatoryMode={"acceptor"} setDoc={setRow}/>

    <Author {...doc} />
  </div>
}
