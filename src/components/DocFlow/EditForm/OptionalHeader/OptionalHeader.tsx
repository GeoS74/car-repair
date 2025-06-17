import { date } from "../../../../libs/formatter";
import styles from "./styles.module.css";

type Props = {
  directing: ISimpleRow
  task?: ISimpleRow
  num?: number
  createdAt?: string
}

export default function OptionalHeader({ directing, task, num, createdAt }: Props) {
  return <div className={styles.root}>
    <div>{num ? <small> № {num || 'б/н'} от {date(createdAt)}</small> : <></>}</div>
    <div>
      <small>{directing.title} / {task?.title}</small>
    </div>
  </div>
}
