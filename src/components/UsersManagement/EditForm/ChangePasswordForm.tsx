import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

import tokenManager from "../../../libs/token.manager";
import session from "../../../libs/token.manager";
import serviceHost from "../../../libs/service.host";
import fetchWrapper from "../../../libs/fetch.wrapper";
import { responseNotIsArray } from "../../../middleware/response.validator";

import InputDefault from "../../Form/Input/InputDefault";
import ButtonCancel from "../../Form/ButtonCancel/ButtonCancel";
import ButtonSubmit from "../../Form/ButtonSubmit/ButtonSubmit";
import Popup from "../../Popup/Popup";
import styles from "./styles.module.css";

export default function ChangePasswordForm() {
  session.subscribe('ChangePasswordForm');

  const user = useLoaderData() as IUser;

  const [modePopup, setModePopup] = useState<PopupMode>();
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();

  const navigate = useNavigate();

  return <div>
    <form className={styles.root}
      onSubmit={event => _onSubmit(
        event,
        setDisabled,
        setErrorResponse,
        setModePopup
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

        <InputDefault
          prefix="password"
          label="Новый пароль пользователя"
          errorMessage={errorMessage} />

        <div></div>

        <ButtonSubmit
          val={'Изменить пароль'}
        />

        <ButtonCancel />
      </fieldset>
    </form>

    {modePopup ? <Popup 
    handlerClick={() => navigate(`/users/management`)}
    mode={modePopup} 
    message={modePopup === "success" ? "Пароль пользователя успешно изменён" : "Возникли ошибки при сбросе пароля! Попробуйте ещё раз"} 
    /> : <></>}
  </div>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  setModePopup: React.Dispatch<React.SetStateAction<PopupMode>>
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget);

  fetchWrapper(() => fetch(`${serviceHost('mauth')}/api/mauth/admin/user/password`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        await response.json();
        setModePopup('success');
        return;
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

function _getErrorResponse(error: string): IErrorMessage {
  switch (error) {
    case "invalid password":
      return { field: "password", message: "Не корретный формат пароля" }
    default: return { field: "", message: "" }
  }
}