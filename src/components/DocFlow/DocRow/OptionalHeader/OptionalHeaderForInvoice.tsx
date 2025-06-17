import styles from "./styles.module.css"

export default function OptionalHeaderForInvoice({ directing, task }: IDoc) {
  return <div className={styles.root}>
    <div><small>Входящий счёт</small></div>
    <div>
      <small>{directing.title} / {task.title}</small>
    </div>
  </div>
}
