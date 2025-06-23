import serviceHost from "../../../../libs/service.host";
import styles from "./styles.module.css"
import { ReactComponent as Person } from "./image/person.svg"

type Props = {
  userPhoto?: string,
}

export default function CommentAvatar({ userPhoto }: Props) {

  return <div className={styles.root}>
    {!userPhoto ?
      <Person width="50" height="50" />
      : <img src={`${serviceHost('informator')}/api/informator/user/photo/${userPhoto}`} loading="lazy" />
    }
  </div>
}
