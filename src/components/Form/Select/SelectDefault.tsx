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
  defaultOptionTitle?: string
}

export default function Selectfault({ prefix, options, val, label, errorMessage, defaultOptionTitle, disabled = false }: Props) {
  return <>
    <div className={classNames(styles.root, "mt-0")}>
      {label ?
        <label htmlFor={`${prefix}Select`} className="form-label mt-1">{label || "Список"}</label>
        : <></>}

      <select
        name={`${prefix}`}
        id={`${prefix}Select`}
        defaultValue={val}
        disabled={disabled}
        className="form-select btn-outline-light"
      >
        <option value="">{defaultOptionTitle || 'Выберите из списка'}</option>
        {_mekeOptions(options)}
      </select>
    </div>
    {errorMessage?.field === prefix ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}

function _mekeOptions(rows: ISimpleRow[]) {
  return rows.map(row => <option value={row.id} key={row.id}>{row.title}</option>)
}