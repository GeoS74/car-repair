import { Link } from "react-router-dom";


import classNames from "classnames"
import styles from "./styles.module.css"

export default function UserRow({ ...user }: IUser) {

  return <div className={classNames(styles.root, "mt-2")}>

    <p><Link to={`/users/management/${user.uid}`} className="nav-link">email: {user.email}</Link></p>
    <p>Имя: {user.name || 'не указано'} (роль: {user?.roles[0]?.title || 'не указана'})</p>
    <p>Компания: {user.company?.title || 'не указана'}</p>
  </div>
}
