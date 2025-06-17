import classNames from "classnames"

import styles from "./styles.module.css"

type Props = {
  description: string | undefined
}

export default function TextPane({ description }: Props) {
  return <div className={classNames("form-group mb-4", styles.root)}>

    <div>
      <label htmlFor="descTextarea" className="form-label mt-4">Пояснительная записка</label>
      <textarea className="form-control" id="descTextarea" name="message" defaultValue={description}></textarea>
    </div>
  </div>
}

