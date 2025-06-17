import classNames from "classnames"

import { ReactComponent as AddDescIcon } from "./image/file-earmark-font.svg"
import styles from "./styles.module.css"

type Props = {
  description?: string
}

export default function TextPane({ description }: Props) {
  return <div className={classNames("form-group mb-4", styles.root)}>

    {
      !description ?
        <p className="mt-4" onClick={_showTextarea}>
          <AddDescIcon width="30" height="30" />
          <small>Добавить пояснительную записку</small></p>
        : <></>
    }
    

    <div hidden={!description}>
      <label htmlFor="descTextarea" className="form-label mt-4">Пояснительная записка</label>
      <textarea className="form-control" id="descTextarea" name="description" defaultValue={description}></textarea>
    </div>
  </div>
}

function _showTextarea(event: React.MouseEvent<HTMLElement, MouseEvent>) {
  const textarea = event.currentTarget.nextElementSibling as HTMLDivElement
  textarea.hidden = !textarea.hidden;

  event.currentTarget.remove();
}