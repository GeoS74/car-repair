// import { useState }from "react"

import styles from "./styles.module.css"

export default function DateComponent({date}: {date: number}) {

    if (0 < date && date < 10) {
        return <div className={styles.root}>{`0${date}`}</div>
    } else {
        return <div className={styles.root}>{`${date}`}</div>
    }
}