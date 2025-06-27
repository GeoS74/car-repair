import { date } from "../../../../libs/formatter";
import styles from "./styles.module.css";

type Props = {
  directing: ISimpleRow
  task?: ISimpleRow
  title?: string
  createdAt?: string
}

export default function OptionalHeader({ directing, task, title, createdAt }: Props) {
  return <div className={styles.root}>
    <div>{title ? <small> № {title || 'б/н'} от {date(createdAt)}</small> : <></>}</div>
    <div>
      <small>{directing.title} / {task?.title}</small>
    </div>
  </div>
}
