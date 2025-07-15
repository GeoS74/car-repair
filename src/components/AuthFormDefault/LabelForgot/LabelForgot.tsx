import styles from "./styles.module.css";

type Props = {
  setFormMode: React.Dispatch<React.SetStateAction<AuthFormMode>>
}

export const LabelForgot = ({ setFormMode }: Props) => {
  return <div className={styles.root}>

    <label htmlFor="password" className="form-label mt-4">Password</label>

    <span
      onClick={() => setFormMode("forgot")}
      className="form-label mt-4"
    >Forgot password?</span>
  </div>
}
