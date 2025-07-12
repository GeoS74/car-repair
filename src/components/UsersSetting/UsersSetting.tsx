import { Outlet } from "react-router-dom";
import styles from "./styles.module.css"

import Navigate from "../navigate/Navigate"

export default function UsersSetting() {
  return <>
    <Navigate />
    <div className={styles.root}>
      <h1>Управление пользователями</h1>
      <hr />
      <Outlet />
    </div>
  </>
}