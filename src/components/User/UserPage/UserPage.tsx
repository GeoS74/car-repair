import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import session from "../../../libs/token.manager"
import Avatar from "../Avatar/Avatar"
import Accordion from "./Accordion/Accordion"
import styles from "./styles.module.css"
import classNames from "classnames"

export default function UserPage() {
  session.subscribe('UserPage');

  const navigate = useNavigate();
  const [user, setUser] = useState(useLoaderData() as IUser);
  const [editMode, setEditMode] = useState(false);
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme;

  return <div className={classNames(styles.root, "mt-4")}>
    <div>
      <Avatar userPhoto={user.photo} />

      <input type="submit" className={classNames(`btn mt-4 mb-2 btn-outline-${theme === 'light' ? 'primary' : 'light'}`)}
        value={editMode ? "Сохранить изменения" : "Редактировать профиль"}
        onClick={event => {
          (event.currentTarget.parentElement?.nextElementSibling?.querySelector('input[type=submit]') as HTMLInputElement).click()
        }}
      />

      <input type="submit" className={classNames(`btn mt-1 mb-2 btn-outline-${theme === 'light' ? 'primary' : 'light'}`)}
        value="Изменить пароль"
        onClick={() => navigate('/user/changePassword')}
      />
    </div>

    <div><Accordion user={user} setUser={setUser} editMode={editMode} setEditMode={setEditMode} /></div>
  </div>
}
