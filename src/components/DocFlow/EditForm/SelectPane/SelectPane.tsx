import { useState } from "react"

import session from "../../../../libs/token.manager"
import finder from "../../../../libs/deep.finder"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import classNames from "classnames"
import styles from "./styles.module.css"

type Props = {
  directingId: string | undefined
  taskId: string | undefined
  mode: string
  errorMessage: IErrorMessage | undefined
}

export default function SelectPane({ directingId, taskId, mode, errorMessage }: Props) {
  const [directing, setDirecting] = useState(_getDirecting(directingId));

  return <div className={classNames(styles.root, "mb-4")}>

    <div className="form-group">
      <label htmlFor="directSelect" className="form-label mt-4">Направление:</label>
      <select name="directingId" className="form-select btn-outline-light mt-2" id="directSelect"
        onChange={(event) => setDirecting(_getDirecting(event.currentTarget.value))}
        defaultValue={directingId}
      >
        <option value="">Выберите направление</option>
        {_mekeOptions(mode, session.getMe()?.roles[0].directings as ISimpleRow[])}
      </select>

      {errorMessage?.field === "directSelect" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
    </div>

    <div className="form-group">
      <label htmlFor="taskSelect" className="form-label mt-4">Тип документа:</label>
      <select name="taskId" className="form-select btn-outline-light mt-2" id="taskSelect"
        defaultValue={taskId}
      >
        <option value="">Выберите тип документа</option>
        {_mekeOptions(mode, directing?.tasks)}
      </select>

      {errorMessage?.field === "taskSelect" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
    </div>

  </div>
}

function _getDirecting(id?: string) {
  return session.getMe()?.roles[0].directings.find(e => e.id.toString()=== id)
}

function _mekeOptions(mode: string, rows?: ISimpleRow[]) {
  if (rows) {
    return rows.map((row, index) => {
      if (finder(row, mode === 'create' ? 'Создать' : 'Редактировать')) {
        return <option value={row.id} key={index}>{row.title}</option>
      }
    })
  }
}