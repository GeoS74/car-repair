import styles from "./styles.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";


export const Button = ({ formMode }: { formMode: AuthFormMode }) => {
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  return <div>
    <button className={classNames(styles.root, `mt-4 btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)}>{_getTitle(formMode)}</button>
      </div>
};

function _getTitle(formMode: AuthFormMode) {
  switch (formMode) {
    case "signin": return "Sign in";
    case "signup": return "Create an account";
    case "forgot": return "Reset password";
  }
}
