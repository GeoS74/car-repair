import { useState } from "react";

import OptionalHeader from "./OptionalHeader/OptionalHeader";
import FileLinkedList from "./FileLinkedList/FileLinkedList";
import Description from "./Description/Description";
import Author from "./Author/Author";
import styles from "./styles.module.css";
import Status from "./Status/Status";
import ChangeStatusButton from "./ChangeStatusButton/ChangeStatusButton";
import Comments from "../Comments/Comments";

export default function DocPageOrder({ ...loaderDoc }: IDoc) {
  const [doc, setDoc] = useState({ ...loaderDoc });
  const [comments, setComments] = useState();

  return <>
    <div className={styles.root}>

      <OptionalHeader {...doc} />

      <Status statusCode={doc.statusCode} />

      <h4 className="mt-4">{doc.title}</h4>

      <Description {...doc} />

      <FileLinkedList files={doc.files} />

      <ChangeStatusButton {...doc} statusMode={"next"} setDoc={setDoc} />
      <ChangeStatusButton {...doc} statusMode={"prev"} setDoc={setDoc} />

      <Author {...doc} />
    </div>
    
    <Comments docId={doc.id}/>
  </>
}
