import { Outlet } from "react-router-dom";
import styles from "./styles.module.css"

import Head from "../Head/Head";
import Navigate from "../navigate/Navigate"

export default function UsersSetting() {
  return <>
    <Head title="Настройки пользователей" description="" />
    <Navigate />
    <div className={styles.root}>
      <h1>Управление пользователями</h1>
      <hr />
      <Outlet />
    </div>
  </>
}