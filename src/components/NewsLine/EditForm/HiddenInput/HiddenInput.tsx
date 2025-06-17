
type Props = {
  typeDoc: DocType
}

export default function HiddenInput({ typeDoc }: Props) {
  return <>
    <input type="hidden" name="directingId" defaultValue={typeDoc.directing.id} />
    <input type="hidden" name="taskId" defaultValue={typeDoc.task?.id} />
  </>
}