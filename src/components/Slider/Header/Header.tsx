import { ReactComponent as Left } from "./icons/arrow-left-circle-fill.svg";
import { ReactComponent as Right } from "./icons/arrow-right-circle-fill.svg";

import styles from "./styles.module.css"

type Props = {
  title: string
  prev: () => void
  next: () => void
  showButton: boolean
}

export default function Header({ title, prev, next, showButton }: Props) {
  return <div className={styles.root} >

    <div>
      <h4>{title}</h4>
    </div>

    <div>
      {showButton ?
          <>
            <Left className={styles.svg}
              onClick={prev}
            />
            <Right className={styles.svg}
              onClick={next}
            />
          </>
          : <></>
      }

    </div>
  </div>
}