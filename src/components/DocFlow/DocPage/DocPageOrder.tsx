import { useState } from "react";

import OptionalHeader from "./OptionalHeader/OptionalHeader";
import FileLinkedList from "./FileLinkedList/FileLinkedList";
import Description from "./Description/Description";
import Author from "./Author/Author";
import styles from "./styles.module.css";
import Status from "./Status/Status";
import ChangeStatusButton from "./ChangeStatusButton/ChangeStatusButton";
import Comments from "../Comments/Comments";

type Props = {
  docLoad: IDoc,
  commentsLoad: IComment[]
}

export default function DocPageOrder({ docLoad, commentsLoad }: Props) {
  const [doc, setDoc] = useState(docLoad);
  const [comments, setComments] = useState(commentsLoad);

  return <>
    <div className={styles.root}>

      <OptionalHeader {...doc} />

      <Status statusCode={doc.statusCode} />

      <h4 className="mt-4">{doc.title}</h4>

      <Description {...doc} />

      <FileLinkedList files={doc.files} />

      <ChangeStatusButton {...doc} statusMode={"next"} setDoc={setDoc} addComment={(comment: IComment) => setComments([comment, ...comments])}/>
      <ChangeStatusButton {...doc} statusMode={"prev"} setDoc={setDoc} addComment={(comment: IComment) => setComments([comment, ...comments])}/>

      <Author {...doc} />
    </div>
    
    <Comments docId={doc.id} comments={comments} addComment={(comment: IComment) => setComments([comment, ...comments])} />
  </>
}
