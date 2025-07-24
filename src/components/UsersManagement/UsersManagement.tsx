import { Outlet } from "react-router-dom";

import Head from "../Head/Head";
import Navigate from "../navigate/Navigate";
import styles from "./styles.module.css";

export default function UsersManagement() {
  return <>
    <Head title="Пользователи системы" description="" />
    <Navigate />
    <div className={styles.root}>
      <h1>Пользователи системы</h1>
      <hr />
      <Outlet />
    </div>
  </>
}