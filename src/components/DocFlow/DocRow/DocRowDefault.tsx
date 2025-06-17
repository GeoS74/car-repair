import { Link } from "react-router-dom";
import { useState } from "react";

import OptionalHeader from "./OptionalHeader/OptionalHeader";
import FileLinkedList from "../DocPage/FileLinkedList/FileLinkedList";
import Description from "../DocPage/Description/Description";
import Author from "../DocPage/Author/Author";
import RequiredToSign from "./RequiredToSign/RequiredToSign";
import AcceptButton from "../DocPage/AcceptButton/AcceptButton";
import classNames from "classnames"
import styles from "./styles.module.css"

export default function DocRow({ ...doc }: IDoc) {

  // этот стейт нужен для возможности подписания документа прямо из списка
  const [row, setRow] = useState({...doc})

  return <div className={classNames(styles.root, "mt-2")}>

    <OptionalHeader {...doc} />

    <h4 className="mt-2"><Link to={`/docflow/${doc.id}`} className="nav-link">{doc.title}</Link></h4>

    <Description {...doc} limit={350} />

    <FileLinkedList files={doc.files} />

    <RequiredToSign {...row} signatoryMode={"acceptor"}/>
    <RequiredToSign {...row} signatoryMode={"recipient"}/>

    <AcceptButton {...row} signatoryMode={"acceptor"} setDoc={setRow}/>
    <AcceptButton {...doc} signatoryMode={"recipient"} setDoc={setRow} />

    <Author {...doc} />
  </div>
}
