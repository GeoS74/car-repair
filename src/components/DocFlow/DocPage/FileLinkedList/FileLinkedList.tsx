import serviceHost from "../../../../libs/service.host"

type Props = {
  files: IStaticFile[]
}

export default function FileLinkedList({ files }: Props) {
  return <>
    {files.length ? <p className="mt-4">Прикреплённые файлы:</p> : <></>}
    <ul>
      {files.map((file, i) => {
        return <li key={file.fileName + i}>
          <a
            className="text-muted"
            href={`${serviceHost('informator')}/api/informator/docflow/scan/${file.fileName}`}
            download={true}
          >{file.originalName}</a>
        </li>
      })}
    </ul>
  </>
}