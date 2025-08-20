import classNames from "classnames";
import styles from "./styles.module.css";
import { useState } from "react";

type HStatus = {
  status: string
  author: string
  createdAt: string
}

type Props = {
  comments: IComment[],
}

export default function StatusHistory({ comments }: Props) {
  const [show, setShow] = useState(false);

  if (show) {
    return <div className={classNames(styles.root, "mt-4")}>
      <p className="badge bg-info"
        onClick={() => setShow(!show)}
      >Скрыть историю изменения статусов</p>
      {_generateTable(comments)}
    </div>
  }

  return <div className={classNames(styles.root, "mt-4")}>
    <p className="badge bg-info"
      onClick={() => setShow(!show)}
    >Показать историю изменения статусов</p>
  </div>
}

function _generateTable(comments: IComment[]) {
  return <table>
    <thead>
      <tr>
        <td>Статус</td>
        <td>Дата изменения</td>
        <td>Пользователь</td>
      </tr>
    </thead>
    <tbody>
      {
        _makeStatusHistory(comments).reverse().map((e, i) => {
          return <tr key={i}>
            <td>{e.status}</td>
            <td>{e.createdAt}</td>
            <td>{e.author}</td>
          </tr>
        })
      }
    </tbody>
  </table>
}



function _makeStatusHistory(comments: IComment[]) {
  const arr: HStatus[] = [];

  comments.map(e => {
    if (e.comment.indexOf("перевёл заказ на следующий статус") === 0 || e.comment.indexOf("вернул назад на этап")) {
      const c = e.comment.match(/"([^"]+)"/g);
      arr.push({
        status: c ? c[c.length - 1] : '',
        author: e.author.name,
        createdAt: e.createdAt,
      });
    }
  });

  return arr;
}