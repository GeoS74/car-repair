import session from "../../../../libs/token.manager"
import styles from "./styles.module.css"

type Props = {
  acceptor: IDocSignatory[]
  recipient: IDocSignatory[]
  signatoryMode: SignatoryMode
}

export default function RequiredToSign({ acceptor, recipient, signatoryMode }: Props) {
  const list = signatoryMode === 'acceptor' ? acceptor : recipient;
  const act = signatoryMode === 'acceptor' ? "подписать" : "ознакомиться";

  // обязательна проверка на  false, т.к. если пользователя нет в списке подписантов find вернёт undefined
  if ((list.find(e => e.uid === session.getMe()?.uid))?.accept === false) {
    return <p className={styles.root}>
      <span className="badge rounded-pill bg-warning">Требуется {act}</span>
    </p>
  }
  return <></>
}