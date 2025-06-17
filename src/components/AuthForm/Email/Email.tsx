import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

type Props = {
  errorMessage: IErrorMessage | undefined
}

export const Email = ({ errorMessage }: Props) => {
  return <div className="form-group">

    <label htmlFor="email" className="form-label mt-1">Email</label>

    <input type="email" id="email" name="email" className="form-control" aria-describedby="emailHelp" placeholder="email" />

    {errorMessage?.field === "email" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </div>
}
