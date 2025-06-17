import finder from "../../../libs/deep.finder"
import session from "../../../libs/token.manager"
import styles from "./styles.module.css"
import classNames from "classnames"
import CancelButton from "../EditForm/CancelButton/CancelButton";

type Props = {
  setTypeDoc: React.Dispatch<React.SetStateAction<DocType | undefined>>
  typeDoc: DocType | undefined
}

export default function DocSelectType({ setTypeDoc, typeDoc }: Props) {

  return <div className={classNames(styles.root, "mt-4")}>
    <legend>Создание документа</legend>
    <p>{!typeDoc?.directing ? 'Выберите направление' : 'Выберите тип документа'}</p>

    {!typeDoc?.directing ? <ul>
      {session.getMe()?.roles[0].directings.map(e => {

        // надо проверять на возможность создавать документы в рамках направления
        // иначе после выбора направления не будет отображён тип документа
        if (finder(e.tasks, 'Создать')) {
          return <li key={e.id}
            onClick={() => setTypeDoc({ directing: e })}
          >{e.title}</li>
        }
      })}
    </ul>
      : <></>}


    <ul>
      {typeDoc?.directing.tasks.map(e => {
        if (finder(e.actions, 'Создать')) {
          return <li key={e.id}
            onClick={() => setTypeDoc({ directing: typeDoc.directing, task: e })}
          >{e.title}</li>
        }
      })}
    </ul>

    <CancelButton />
  </div>
}