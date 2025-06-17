import { useState } from "react";

import tokenManager from "../../../../libs/token.manager"
import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../middleware/response.validator"
import InputPassword from "./InputPassword/InputPassword";
import SubmitButton from "./SubmitButton/SubmitButton";
import CancelButton from "./CancelButton/CancelButton";
import styles from "./styles.module.css"
import classNames from "classnames"

export default function ChangePassForm() {
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();
  const [complete, setComplete] = useState(false)

  return <form onSubmit={event => _onSubmit(event, setDisabled, setErrorResponse, setComplete)}>
    <fieldset disabled={disabled}>
      <div className={classNames(styles.root, "card mt-4")}>
        <div className="card-header">
          <h2 className="mt-2">Изменение пароля</h2>
        </div>

        {complete ? 
          <div className="card-body"><p>Пароль успешно изменён</p></div> :

          <div className="card-body">
            <p className="card-text mt-1">Введите новый пароль:</p>
            <InputPassword name="password" errorMessage={errorMessage} />
            <p className="card-text mt-4">Повторите пароль:</p>
            <InputPassword name="password_2" errorMessage={errorMessage} />
            <div>
              <SubmitButton />
              <CancelButton />
            </div>
          </div>
        }
 
      </div>
    </fieldset>
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  setComplete: React.Dispatch<React.SetStateAction<boolean>>
) {
  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget);

  if(fd.get('password') !== fd.get('password_2')) {
    setErrorResponse(_getErrorResponse("password missmatch"));
    setDisabled(false);
    return;
  }

  fetchWrapper(() => fetch(`${serviceHost('mauth')}/api/mauth/password`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        // const res = await response.json();
        setErrorResponse(_getErrorResponse(""))
        setComplete(true);
      }
      else if (response.status === 400) {
        const res = await response.json();
        setErrorResponse(_getErrorResponse(res.error))
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}


function _getErrorResponse(error: string): IErrorMessage {
  switch (error) {
    case "invalid password":
      return { field: "password", message: "указан не корректный пароль" }
    case "password missmatch":
      return { field: "password_2", message: "пароли не совпадают" }
    default: return { field: "", message: "" }
  }
}