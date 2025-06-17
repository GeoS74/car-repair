import { date } from "../../../../libs/formatter";
import styles from "./styles.module.css";

export default function OptionalHeader({ directing, task, num, createdAt }: IDoc) {
  return <div className={styles.root}>
    <div><small> № {num || 'б/н'} от {date(createdAt)}</small></div>
    <div>
      <small>{directing.title} / {task.title}</small>
    </div>
  </div>
}
