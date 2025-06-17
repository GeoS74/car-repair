import styles from "./styles.module.css"

export default function YearComponent({year}: {year: number}) {

    return (
        <div className={styles.root}>{year}</div>
    )
}