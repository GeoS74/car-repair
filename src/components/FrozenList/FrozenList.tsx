import { useLoaderData } from "react-router-dom";
import styles from "./styles.module.css"

type Props = {
    title: string
  }

export default function FrozenList({ title }: Props) {
    const preloadData = useLoaderData() as ISimpleRow[] | IStatus[];

    return <div className={styles.root}>
        <h3>{title}</h3>

        <ul className="mt-4">
            {preloadData.map(row => <li key={('id' in row) ? row.id : row.code}>
                {row.title}
            </li>)}
        </ul>
    </div>
}