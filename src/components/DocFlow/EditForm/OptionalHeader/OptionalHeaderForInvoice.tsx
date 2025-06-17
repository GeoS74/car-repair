import styles from "./styles.module.css"

type Props = {
  directing: ISimpleRow
  task?: ISimpleRow
}

export default function OptionalHeaderForInvoice({ directing, task }: Props) {
  return <div className={styles.root}>
    <div><small>Входящий счёт</small></div>
    <div>
      <small>{directing.title} / {task?.title}</small>
    </div>
  </div>
}
