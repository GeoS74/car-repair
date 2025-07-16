import { useState } from "react";
import { useNavigate, NavigateFunction, useLoaderData } from "react-router-dom";

import tokenManager from "../../../libs/token.manager";
import session from "../../../libs/token.manager";
import serviceHost from "../../../libs/service.host";
import fetchWrapper from "../../../libs/fetch.wrapper";
import { responseNotIsArray } from "../../../middleware/response.validator";

import InputDefault from "../../Form/Input/InputDefault";
import SelectDefault from "../../Form/Select/SelectDefault";
import ButtonCancel from "../../Form/ButtonCancel/ButtonCancel";
import ButtonSubmit from "../../Form/ButtonSubmit/ButtonSubmit";
import styles from "./styles.module.css";

export default function EditForm() {
  session.subscribe('EditForm');
  
  const [user, companies] = useLoaderData() as [IUser, ISimpleRow[]];

  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();

  const navigate = useNavigate();

  return <form className={styles.root}
    onSubmit={event => _onSubmit(
      event,
      setDisabled,
      setErrorResponse,
      navigate,
      user
    )}
  >
    <fieldset disabled={disabled} className="form-group">

      {/* <OptionalHeader directing={typeDoc.directing} task={typeDoc.task} {...doc} /> */}

      <legend className="mt-3">{!user ? "Добавление пользователя" : "Изменение данных пользователя"}</legend>

      <InputDefault
        prefix="email"
        label="email"
        val={user?.email}
        readOnly={!!user?.email}
        errorMessage={errorMessage} />

      {!user ?
        <InputDefault
        prefix="password"
        label="Пароль пользователя"
        errorMessage={errorMessage} />
      : <></>}

      <InputDefault
        prefix="name"
        label="Имя пользователя"
        val={user?.name}
        errorMessage={errorMessage} />

      <SelectDefault
        prefix="company"
        label="Компания"
        options={companies}
        val={user?.company?.id+""}
      />

      <ButtonSubmit
        val={!user ? 'Создать пользователя' : 'Изменить данные'}
      />

      <ButtonCancel />
    </fieldset>
  </form>
}

function _createUser(
  fd: FormData,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  navigate: NavigateFunction,
) {
  return fetchWrapper(() => fetch(`${serviceHost("mauth")}/api/mauth/admin/user/signup`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
  .then(responseNotIsArray)
  .then(async response => {
    if (response.ok) {
      const res = await response.json();
      return res;
    }
    else if (response.status === 400) {
      const res = await response.json();
      setErrorResponse(_getErrorResponse(res.error));
      throw new Error(`error: ${res.error}`);
    }
    throw new Error(`response status: ${response.status}`);
  })
  .then(() => fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/user/management`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  })))
  .then(responseNotIsArray)
  .then(async response => {
    if (response.ok) {
      const res = await response.json();
      return navigate(`/users/management/${res.uid}`)
    }
    else if (response.status === 400) {
      const res = await response.json()
      setErrorResponse(_getErrorResponse(res.error))
      return;
    }
    throw new Error(`response status: ${response.status}`)
  })
  .catch(error => console.log(error.message))
  .finally(() => setDisabled(false));
}

function _updateUser(
  fd: FormData,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  navigate: NavigateFunction,
) {
  return fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/user/management`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        return navigate(`/users/management/${res.uid}`)
      }
      else if (response.status === 400) {
        const res = await response.json()
        setErrorResponse(_getErrorResponse(res.error))
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  navigate: NavigateFunction,
  user?: IUser
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget);

  if (!user) {
    return _createUser(fd, setDisabled, setErrorResponse, navigate);
  }  
  return _updateUser(fd, setDisabled, setErrorResponse, navigate);
}

function _getErrorResponse(error: string): IErrorMessage {
  switch (error) {
    case "invalid email":
      return { field: "email", message: "Не корретный email пользователя" }
    case "invalid password":
      return { field: "password", message: "Не корретный формат пароля" }
    default: return { field: "", message: "" }
  }
}