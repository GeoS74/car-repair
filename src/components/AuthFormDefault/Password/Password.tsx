import styles from "./styles.module.css";
import { useState } from "react";

import { LabelForgot } from "../LabelForgot/LabelForgot";
import { Eye } from "../Eye/Eye";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import classNames from "classnames";

type Props = {
  formMode: AuthFormMode,
  setFormMode: React.Dispatch<React.SetStateAction<AuthFormMode>>,
  errorMessage: IErrorMessage | undefined
}

export const Password = ({ formMode, setFormMode, errorMessage }: Props) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  return formMode === "forgot" ?
    <></> :
    <div className={classNames(styles.root, "form-group")}>

      <LabelForgot setFormMode={setFormMode} />

      <input type={visiblePassword ? "text" : "password"} id="password" name="password" className="form-control" placeholder="password" />

      <Eye visiblePassword={visiblePassword} setVisiblePassword={setVisiblePassword} />

      {errorMessage?.field === "password" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
    </div>
};
