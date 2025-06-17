import { ErrorMessage } from "../ErrorMessage/ErrorMessage"

type Props = {
  name: string,
  errorMessage?: IErrorMessage
}

export default function InputPassword({name, errorMessage}: Props) {
  return <>
    <input type="password" name={name} defaultValue="" />
    <br></br>
    {errorMessage?.field === name ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}