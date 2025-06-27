import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import classNames from "classnames";
import styles from "./styles.module.css";

type Props = {
  prefix: string,
  val?: string
  label?: string
  errorMessage?: IErrorMessage
  disabled?: boolean
}

export default function InputDefault({ prefix, val, label, errorMessage, disabled = false }: Props) {
  return <>
    <div className={classNames(styles.root, "mt-4")}>
      <label htmlFor={`${prefix}Input`} className="form-label mt-1">{label || "Название"}</label>
      <input
        type="text"
        id={`${prefix}Input`}
        defaultValue={val}
        name={`${prefix}`}
        className="form-control"
        placeholder={label || "Введите название"} 
        disabled={disabled}/>
    </div>
    {errorMessage?.field === prefix ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}