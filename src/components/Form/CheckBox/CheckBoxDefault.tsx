import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import classNames from "classnames";
import styles from "./styles.module.css";

type Props = {
  prefix: string,
  checked?: boolean
  label?: string
  placeholder?: string
  disabled?: boolean
  errorMessage?: IErrorMessage
}

export default function CheckBoxDefault({ prefix, label, errorMessage, disabled = false }: Props) {
  return <>
    <div className={classNames(styles.root, "form-check", "mt-0")}>
      <input
        type="checkbox"
        id={`${prefix}CheckBox`}
        name={`${prefix}`}
        className="form-check-input"
        disabled={disabled}
      />
      <label className="form-check-label" htmlFor={`${prefix}CheckBox`}>
        {label || "checkbox"}
      </label>
    </div>
    {errorMessage?.field === prefix ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}