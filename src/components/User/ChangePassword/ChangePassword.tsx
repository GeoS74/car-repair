import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import session from "../../../libs/token.manager"
import Avatar from "../Avatar/Avatar"
import ChangePassForm from "./ChangePassForm/ChangePassForm";
import styles from "./styles.module.css"
import classNames from "classnames"

export default function ChangePassword() {
  session.subscribe('UserChangePassword');

  const navigate = useNavigate();
  const user = useLoaderData() as IUser;
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme;

  return <div className={classNames(styles.root, "mt-4")}>
  <div>
    <Avatar userPhoto={user.photo} />

    <input type="submit" className={classNames(`btn mt-4 mb-2 btn-outline-${theme === 'light' ? 'primary' : 'light'}`)}
        value="Редактировать профиль"
        onClick={() => navigate(-1)}
      />
  </div>

  <div><ChangePassForm/></div>
</div>
}