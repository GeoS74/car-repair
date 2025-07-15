import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  formMode: AuthFormMode,
  setFormMode: React.Dispatch<React.SetStateAction<AuthFormMode>>
}

export const Footer = ({ formMode, setFormMode }: Props) => {
  return <div className={classNames(styles.root, "form-group mt-2")}>
    <p>{formMode === "signin" ? "Not registered? " : "Already have an account? "}
      <span
        onClick={() => setFormMode(formMode === 'signin' ? 'signup' : 'signin')}
      >{formMode === "signin" ? "Create an account" : "Sign in"}</span>
    </p>
  </div>
}
