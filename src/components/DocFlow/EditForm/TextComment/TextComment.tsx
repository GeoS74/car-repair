import classNames from "classnames"
import styles from "./styles.module.css"

export default function TextComment() {
  return <div className={classNames("form-group mb-4", styles.root)}>
    <label htmlFor="commentTextarea" className="form-label mt-4">Добавить поясение</label>
    <textarea className="form-control" id="commentTextarea" name="comment" ></textarea>
  </div>
}