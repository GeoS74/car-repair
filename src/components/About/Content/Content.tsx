import { Converter } from "md-conv"

import styles from "./styles.module.css"

const converter = new Converter()

type Props = {
  about: IAbout | undefined
}

export default function Content({ about }: Props) {
  return about?.mdInfo ?
    <div dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(about?.mdInfo) }}
      className={styles.root}>
    </div>
    : <></>
}