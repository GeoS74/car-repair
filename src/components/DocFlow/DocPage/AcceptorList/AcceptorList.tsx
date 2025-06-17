import styles from "./styles.module.css"

export default function AcceptorList({ acceptor }: IDoc) {
  return <div className={styles.root}>
    {acceptor.map(e => {
      return <div key={e.uid} className="mt-2">
        <div>{e.position}</div>
        <div>
          {e.accept ?
            <div className={styles.sign}>подписан
              <br></br>
              <small>uid: {e.uid}</small>
            </div>
            : <></>}
        </div>
        <div>{e.name}</div>
      </div>
    })}
  </div>
}