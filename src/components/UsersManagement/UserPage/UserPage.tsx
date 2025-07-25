import { useLoaderData } from "react-router-dom";

import session from "../../../libs/token.manager";
import OptionalHeader from "./OptionalHeader/OptionalHeader";
import Avatar from "./Avatar/Avatar";
import styles from "./styles.module.css";

export default function UserPage() {
  session.subscribe('UserPage');

  const user = useLoaderData() as IUser;

  return <div>
    <h3 className="mb-4">Данные пользователя</h3>
    
    <div className={styles.root}>
      <OptionalHeader {...user} />

      <Avatar userPhoto={user.photo} />

      <p>email: {user.email}</p>
      <p>Имя: {user.name}</p>
      <p>Компания: {user?.company?.title || 'не указана'}</p>
      <p>Роль: {user?.roles[0]?.title || 'не указана'}</p>
    </div>
  </div>
   
}
