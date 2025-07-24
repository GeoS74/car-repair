import { Outlet } from "react-router-dom";

import Navigate from "../navigate/Navigate";
import styles from "./styles.module.css"
import Head from "../Head/Head";

export default function User() {
  return <>
    <Head title="БОВИД - личный кабинет" description=""/>
    <Navigate />

    <div className={styles.root} >
      <h1>Личный кабинет</h1>
      <hr />

      <Outlet />
    </div>
  </>
}
