import { Outlet } from "react-router-dom";

import Head from "../Head/Head";
import Navigate from "../navigate/Navigate";
import styles from "./styles.module.css";

export default function Cars() {
  return <>
    <Head title="Список автомобилей" description="" />
    <Navigate />
    <div className={styles.root} >
      <h1>Автомобили</h1>
      <hr />
      <Outlet />
    </div>
  </>
}