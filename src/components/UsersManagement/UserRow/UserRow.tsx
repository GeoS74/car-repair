import { Link } from "react-router-dom";

import ChangePasswordButton from "../../Common/ButtomAdding/ButtonAdding";
import ResetSessionButton from "./ResetSessionButton/ResetSessionButton";
import classNames from "classnames"
import styles from "./styles.module.css"

type Props = IUser & {
  setModePopup: React.Dispatch<React.SetStateAction<PopupMode>>
}

export default function UserRow({ setModePopup, ...user }: Props) {

  return <div className={classNames(styles.root, "mt-2")}>

    <p><Link to={`/users/management/${user.uid}`} className="nav-link">email: {user.email}</Link></p>
    <p>Имя: {user.name || 'не указано'} (роль: {user?.roles[0]?.title || 'не указана'})</p>
    <p>Компания: {user.company?.title || 'не указана'}</p>

    <ChangePasswordButton
      to={`/users/management/change/password/user/${user.uid}`}
      val='изменить пароль'
    />
    <ResetSessionButton email={user.email} setModePopup={setModePopup} />
  </div>
}
