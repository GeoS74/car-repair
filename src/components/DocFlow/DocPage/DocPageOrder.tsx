import { useEffect, useState } from "react";

import OptionalHeader from "./OptionalHeader/OptionalHeader";
import FileLinkedList from "./FileLinkedList/FileLinkedList";
import Description from "./Description/Description";
import Author from "./Author/Author";
import Status from "./Status/Status";
import ChangeStatusButton from "./ChangeStatusButton/ChangeStatusButton";
import StatusHistory from "../StatusHistory/StatusHistory";
import Comments from "../Comments/Comments";
import styles from "./styles.module.css";

type Props = {
  docLoad: IDoc,
  commentsLoad: IComment[]
}

export default function DocPageOrder({ docLoad, commentsLoad }: Props) {
  useEffect(() => window.scrollTo(0, 0)); // прокрутка страницы к верху

  {/* для документов Высочайший идёт сквозная нумерация*/}
  if(docLoad.directing.title.search(/высочайший/i) !== -1) {
    docLoad.title = docLoad.num.toString();
  }

  const [doc, setDoc] = useState(docLoad);
  const [comments, setComments] = useState(commentsLoad);

  return <div>
    <h3 className="mb-4">{doc.task.title || ""}</h3>

    <div className={styles.root}>

      <OptionalHeader {...doc} />

      <Status statusCode={doc.statusCode} />

      <h5 className="mt-4 mb-4">Заявка на ремонт: {doc.title}</h5>

      <p>Автомобиль: {doc.car?.carModel}</p>
      <p>Гос. номер: {doc.car?.stateNumber}</p>
      <p>VIN-код: {doc.car?.vin} </p>
      <p>№ шасси: {doc.car?.chassisNumber} </p>
      <p>Пробег автомобиля: {doc?.mileage} </p>



      <hr></hr>
      <p className="mt-4">Список неисправностей:</p>
      <Description {...doc} />

      <FileLinkedList files={doc.files} />

      <ChangeStatusButton {...doc} statusMode={"prev"} setDoc={setDoc} addComment={(comment: IComment) => setComments([comment, ...comments])} />
      <ChangeStatusButton {...doc} statusMode={"next"} setDoc={setDoc} addComment={(comment: IComment) => setComments([comment, ...comments])} />

      <Author {...doc} />
    </div>

    {/* добавить в массив комментариев информацию о создании заявки */}
    <StatusHistory comments={[{
      id: '',
      comment: 'перевёл заказ на следующий статус "Заявка создана"',
      author: doc.author,
      createdAt: doc.createdAt,
      files: []
    }, ...comments]} />

    <Comments
      docId={doc.id}
      comments={comments}
      addComment={(comment: IComment) => setComments([comment, ...comments])}
      setFiles={(files: IStaticFile[]) => setDoc({ ...doc, files: [...doc.files, ...files] })}
      linkedFiles={doc.files}
    />
  </div>
}
