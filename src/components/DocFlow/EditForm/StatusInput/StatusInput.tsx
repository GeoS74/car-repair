type Props = {
  statusCode: number
}

export default function StatusInput({statusCode}: Props) {
  return <>
    <input type="hidden" name="statusCode" defaultValue={statusCode} />
  </>
}