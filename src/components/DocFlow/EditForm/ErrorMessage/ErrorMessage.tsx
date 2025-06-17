import styles from "./styles.module.css";
import classNames from "classnames";

export const ErrorMessage = ({errorMessage}: {errorMessage: string}) => {
  return <small className={classNames(styles.root, "form-text")}>{errorMessage}</small>
}
