import { ReactComponent as IconSign } from "./icons/person-check.svg"
import styles from "./styles.module.css"

export default function RecipientList({ recipient }: IDoc) {
  if(!recipient.length) {
    return <></>
  }

  return <div className={styles.root}>
    <p className="mt-4">Ознакомиться:</p>
    <ul>
    {recipient.map(e => {
      return <li key={e.uid} className="mt-2">
        {e.accept ? <IconSign className={styles.svg}/> : <></>}
        {e.position} {e.name}
      </li>
    })}
    </ul>
  </div>
}