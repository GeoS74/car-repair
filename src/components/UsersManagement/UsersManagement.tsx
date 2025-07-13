import { Outlet } from "react-router-dom";

import Navigate from "../navigate/Navigate";
import styles from "./styles.module.css";

export default function UsersManagement() {
  return <>
    <Navigate />
    <div className={styles.root}>
      <h1>Пользователи системы</h1>
      <hr />
      <Outlet />
    </div>
  </>
}