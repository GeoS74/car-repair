import serviceHost from "../../../libs/service.host"
import { Converter } from "md-conv"

import styles from "./styles.module.css"
import classNames from "classnames";

const converter = new Converter()

type Props = {
  image: string | undefined
  message: string
  width: number
}

export default function Slider({ image, message, width }: Props) {
  return <div className={classNames(styles.root)} style={{ width: `${width}px` }}>
    <div className={styles.wrapper}>
      <div>
      {image ? <img src={`${serviceHost('mnote')}/api/mnote/static/images/${image}`} /> : <></>}
      </div>

      <div dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(message) }}></div>
    </div>
  </div>
}