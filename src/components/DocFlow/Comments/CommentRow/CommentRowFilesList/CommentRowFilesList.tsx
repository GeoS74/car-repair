import { ReactComponent as FileIcon } from "./image/file-earmark-text.svg";
import serviceHost from "../../../../../libs/service.host";
import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  files: IStaticFile[]
  linkedFiles: IStaticFile[]
}

export default function CommentRowFilesList({ files, linkedFiles }: Props) {

  return <div className={classNames(styles.root)}>
    {files.length ? <><p>добавлены файлы:</p></> : <></>}

    {files.map(f => <div key={f.fileName} className={styles.link}>
      <FileIcon width="25" height="25" />
      {_isFileIsDeletef(f, linkedFiles) === -1 ? <span className="text-muted">{`${f.originalName} (файл был удалён)`}</span> :
        <a href={`${serviceHost('informator')}/api/informator/docflow/scan/${f.fileName}`}
          download={f.originalName}
          target="_blank"
          rel="noopener noreferrer"
        >{f.originalName}</a>}
    </div>)}

  </div>
}

function _isFileIsDeletef(
  needle: IStaticFile,
  haystack: IStaticFile[]
) {
  return haystack.findIndex(e => e.fileName === needle.fileName)
}