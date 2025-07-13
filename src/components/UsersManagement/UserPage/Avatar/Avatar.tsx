import serviceHost from "../../../../libs/service.host"
import styles from "./styles.module.css"
import { ReactComponent as Person } from "./image/person.svg"
import classNames from "classnames"

type Props = {
  userPhoto?: string,
}

export default function Avatar({ userPhoto }: Props) {
  return  <div className={classNames(styles.root, "mb-4")}>
  {!userPhoto ?
    <Person width="150" height="150" />
    : <img src={`${serviceHost('informator')}/api/informator/user/photo/${userPhoto}`} loading="lazy" />
  }
</div>
}
