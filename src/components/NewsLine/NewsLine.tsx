import { Outlet } from "react-router-dom";

import Navigate from "../navigate/Navigate";
import styles from "./styles.module.css"

export default function Slider() {
    return <>
        <Navigate />
        <div className={styles.root} >
            <h1>Управление слайдами</h1>
            <hr />
            <Outlet />
        </div>
    </>
}