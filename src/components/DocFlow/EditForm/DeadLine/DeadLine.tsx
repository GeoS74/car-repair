import { date } from "../../../../libs/formatter"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import styles from "./styles.module.css"

type Props = {
  deadLine?: string
  errorMessage?: IErrorMessage
}

export default function DeadLine({ deadLine, errorMessage }: Props) {

  return <>
    <div className={styles.root}>
      <label htmlFor="deadLineInput" className="form-label mt-4">Дата оплаты</label>
      <input
        required={true}
        type="text"
        id="deadLineInput"
        defaultValue={date(deadLine || (new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toString()))}
        name="deadLine"
        className="form-control"
        placeholder="Укажите дату оплаты" />
    </div>
    {errorMessage?.field === "deadLine" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}