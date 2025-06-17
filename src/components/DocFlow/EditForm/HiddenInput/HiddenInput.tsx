import session from "../../../../libs/token.manager"

type Props = {
  typeDoc: DocType
}

export default function HiddenInput({ typeDoc }: Props) {
  return <>
    <input type="hidden" name="directingId" defaultValue={typeDoc.directing.id} />
    <input type="hidden" name="taskId" defaultValue={typeDoc.task?.id} />
    <input type="hidden" name="author" defaultValue={session.getMe()?.email} />
  </>
}