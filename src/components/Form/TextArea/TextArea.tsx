import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import classNames from "classnames";
import styles from "./styles.module.css";

type Props = {
  prefix: string,
  val?: string
  label?: string
  errorMessage?: IErrorMessage
}

export default function TextArea({ prefix, val, label, errorMessage }: Props) {
  return <>
    <div className={classNames("form-group mb-4", styles.root)}>
      <label htmlFor={`${prefix}TextArea`} className="form-label mt-4">{label || "Текст"}</label>
      <textarea
        className="form-control"
        id={`${prefix}TextArea`}
        name={`${prefix}`}
        defaultValue={val}
      ></textarea>
    </div>
    {errorMessage?.field === prefix ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}