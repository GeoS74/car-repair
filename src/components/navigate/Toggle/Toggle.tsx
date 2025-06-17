import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css"

import {setTheme} from "../../../store/slice/themeSlise"


export default function Toggle() {
  const dispatch = useDispatch(); 
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  return (
    <div className={styles.root}>
      <section className={styles.model}>
        <div className={styles.checkbox}>
              <input type="checkbox"
                defaultChecked={theme !== "dark"}
                onClick={() => dispatch(setTheme())}
              />
          <label></label>
        </div>
      </section>
    </div>
  )
}