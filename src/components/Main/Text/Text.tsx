import { Converter } from "md-conv"
import styles from "./styles.module.css"

const converter = new Converter();

type Props = {
  about: IAbout
}

export default function Text({ about }: Props) {
  if (!about?.mdInfo) {
    return <></>
  }
  return <div className={styles.root}>
    <div dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(about?.mdInfo) }}>
    </div>
  </div>
}