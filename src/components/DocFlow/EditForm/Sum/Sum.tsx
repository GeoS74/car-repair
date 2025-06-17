import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import styles from "./styles.module.css"

type Props = {
  sum?: number
  errorMessage?: IErrorMessage
}

export default function Sum({ sum, errorMessage }: Props) {
  return <>
    <div className={styles.root}>
      <label htmlFor="sumInput" className="form-label mt-1">Сумма</label>
      <input
        type="text"
        id="sumInput"
        defaultValue={sum}
        name="sum"
        className="form-control"
        placeholder="Сумма счёта" />
    </div>
    {errorMessage?.field === "sum" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}