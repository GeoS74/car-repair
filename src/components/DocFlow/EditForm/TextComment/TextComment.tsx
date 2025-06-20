import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import classNames from "classnames"
import styles from "./styles.module.css"

type Props = {
  errorMessage?: IErrorMessage
}

export default function TextComment({ errorMessage }: Props) {
  return <>
    <div className={classNames("form-group mb-4", styles.root)}>
      <label htmlFor="commentTextarea" className="form-label mt-4">Добавить поясение</label>
      <textarea className="form-control" id="commentTextarea" name="comment" ></textarea>
    </div>
    {errorMessage?.field === "commentTextarea" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}