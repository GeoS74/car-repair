import { Outlet } from "react-router-dom";

import Head from "../Head/Head";
import Navigate from "../navigate/Navigate";
import styles from "./styles.module.css";

export default function DocFlow() {
  return <>
    <Head title="БОВИД - ремонт грузовой техники" description="" />
    <Navigate />
    <div className={styles.root} >
      <h1>Документы</h1>
      <hr />
      <Outlet />
    </div>
  </>
}