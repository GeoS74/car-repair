import { useEffect } from "react";
import finder from "../../../libs/deep.finder"
import session from "../../../libs/token.manager"
import classNames from "classnames"
import CancelButton from "../EditForm/CancelButton/CancelButton";
import styles from "./styles.module.css"

type Props = {
  setTypeDoc: React.Dispatch<React.SetStateAction<DocType | undefined>>
}

export default function SelectTypeDirectingForInvoice({ setTypeDoc }: Props) {

  const directings = _getDirectingsWithInvoice();
  const invoice = _getInvoiсe();

  useEffect(() => {
    if (directings.length === 1) {
      setTypeDoc({ directing: directings[0], task: invoice });
    }
  })

  return <div className={classNames(styles.root, "mt-4")}>
    <legend>Создание счёта</legend>
    <p>Выберите направление</p>

    <ul>
      {directings.map(d => {
        return <li key={d.id}
          onClick={() => setTypeDoc({ directing: d, task: invoice })}
        >{d.title}</li>
      })}
    </ul>

    <CancelButton />
  </div>
}

// ЗАВИСИМОСТЬ от названия типа документа!!!
function _getInvoiсe() {
  let task: ITask | undefined;

  session.getMe()?.roles.map(r => {
    r.directings.map(d => {
      d.tasks.map(t => {
        if (t.title === 'Счёт') {
          task = t;
        }
      })
    })
  });
  return task;
}

// ЗАВИСИМОСТЬ от названия типа документа!!!
function _getDirectingsWithInvoice() {
  const arr: IDirecting[] = [];
  session.getMe()?.roles.map(r => {
    r.directings.map(d => {
      d.tasks.map(t => {
        if (t.title === 'Счёт') {
          if (finder(t.actions, 'Создать')) {
            arr.push(d);
          }
        }
      })
    })
  });
  return arr;
}