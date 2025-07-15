import classNames from "classnames";
import serviceHost from "../../../../libs/service.host";

import { ReactComponent as FileIcon } from "./image/file-earmark-text.svg";
import styles from "./styles.module.css";

type Props = {
  files: IStaticFile[]
}

export default function FileLinkedList({ files }: Props) {
  return <div className={classNames(styles.root, "mb-4")}>
    {files.length ? <p className="mt-4">Прикреплённые файлы:</p> : <></>}
    <ul>
      {files.map((file, i) => {
        return <li key={file.fileName + i} className={styles.link}>
          <FileIcon width="25" height="25" />
          <a
            // className="text-muted"
            href={`${serviceHost('informator')}/api/informator/docflow/scan/${file.fileName}`}
            download={file.originalName}
            target="_blank"
            rel="noopener noreferrer"
          >{file.originalName}</a>
        </li>
      })}
    </ul>
  </div>
}