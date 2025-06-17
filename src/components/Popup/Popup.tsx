import { useState } from "react";

import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  mode: PopupMode
  message: string
}

export default function Popup({ mode, message }: Props) {
  const [popupMode, setPopupMode] = useState<PopupMode>(mode);

  if (!popupMode) {
    return <></>
  }

  return <div className={classNames(styles.root, styles.layer)}>
    
    <div className={classNames(styles.layer, styles.fon)} onClick={() => setPopupMode(undefined)}></div>

    <div className={classNames('alert alert-dismissible', `alert-${popupMode}`)}>
      <button type="button" className="btn-close"
        onClick={() => setPopupMode(undefined)}></button>
      <strong>{message}</strong>
    </div>
  </div>
}

