import { useEffect, useState } from "react";

import OptionalHeader from "./OptionalHeader/OptionalHeader";
import FileLinkedList from "./FileLinkedList/FileLinkedList";
import Description from "./Description/Description";
import Author from "./Author/Author";
import Status from "./Status/Status";
import ChangeStatusButton from "./ChangeStatusButton/ChangeStatusButton";
import Comments from "../Comments/Comments";
import styles from "./styles.module.css";

type Props = {
  docLoad: IDoc,
  commentsLoad: IComment[]
}

export default function DocPageOrder({ docLoad, commentsLoad }: Props) {
  useEffect(() => window.scrollTo(0, 0)); // прокрутка страницы к верху

  const [doc, setDoc] = useState(docLoad);
  const [comments, setComments] = useState(commentsLoad);
console.log(doc)
  return <div>
    <h3 className="mb-4">{doc.task.title || ""}</h3>

    <div className={styles.root}>

      <OptionalHeader {...doc} />

      <Status statusCode={doc.statusCode} />

      <h5 className="mt-4 mb-4">Заявка на ремонт: {doc.title}</h5>

      <p>Автомобиль: {doc.car?.carModel}</p>
      <p>Гос. номер: {doc.car?.stateNumber}</p>
      <p>VIN номер(шасси): {doc.car?.vin} </p>
      <p>Пробег автомобиля: {doc?.mileage} </p>

      <hr></hr>
      <p className="mt-4">Список неисправностей:</p>
      <Description {...doc} />

      <FileLinkedList files={doc.files} />

      <ChangeStatusButton {...doc} statusMode={"prev"} setDoc={setDoc} addComment={(comment: IComment) => setComments([comment, ...comments])} />
      <ChangeStatusButton {...doc} statusMode={"next"} setDoc={setDoc} addComment={(comment: IComment) => setComments([comment, ...comments])} />

      <Author {...doc} />
    </div>

    <Comments
      docId={doc.id}
      comments={comments}
      addComment={(comment: IComment) => setComments([comment, ...comments])}
      setFiles={(files: IStaticFile[]) => setDoc({ ...doc, files: [...doc.files, ...files] })}
      linkedFiles={doc.files}
    />
  </div>
}
