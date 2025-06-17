import { useLoaderData } from "react-router-dom";
import styles from "./styles.module.css"

export default function FrozenList() {
    const preloadData = useLoaderData() as ISimpleRow[];

    return <div className={styles.root}>
        <h3>Список действий</h3>

        <ul className="mt-4">
            {preloadData.map(row => <li key={row.id}>
                {row.title}
            </li>)}
        </ul>
    </div>
}