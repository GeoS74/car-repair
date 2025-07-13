import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import classNames from "classnames";
import styles from "./styles.module.css";

type Props = {
  prefix: string,
  options: ISimpleRow[]
  val?: string
  label?: string
  errorMessage?: IErrorMessage
  disabled?: boolean
}

export default function Selectfault({ prefix, options, val, label, errorMessage, disabled = false }: Props) {
  return <>
    <div className={classNames(styles.root, "mt-4")}>
      <label htmlFor={`${prefix}Select`} className="form-label mt-1">{label || "Список"}</label>
      
      <select 
      name={`${prefix}`}
      id={`${prefix}Select`}
      defaultValue={val}
      disabled={disabled}
      className="form-select btn-outline-light"
      >
        <option value="">Выберите компанию</option>
        {_mekeOptions(options)}
      </select>
    </div>
    {errorMessage?.field === prefix ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}

function _mekeOptions(rows: ISimpleRow[]) {
  return rows.map(row => <option value={row.id} key={row.id}>{row.title}</option>)
}