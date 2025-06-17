import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

type Props = {
  formMode: AuthFormMode,
  errorMessage: IErrorMessage | undefined
}

export const YourName = ({ formMode, errorMessage }: Props) => {
  return formMode === "signup" ?
    <div className="form-group">

      <label htmlFor="name" className="form-label mt-4">Введите ФИО</label>

      <input type="text" id="name" name="name" className="form-control" placeholder="ФИО" required />

      {errorMessage?.field === "name" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
    </div>
    : <></>
}
