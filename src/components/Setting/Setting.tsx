import { Outlet } from "react-router-dom";
import Head from "../Head/Head";
import styles from "./styles.module.css";

import Navigate from "../navigate/Navigate";

export default function Setting() {
  return <>
    <Head title="Настройки" description="" />
    <Navigate />
    <div className={styles.root}>
      <h1>Настройки</h1>
      <hr />
      <Outlet />
    </div>
  </>
}