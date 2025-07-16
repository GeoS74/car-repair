import { useState } from "react";
import tokenManager from "../../../../libs/token.manager"
import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../middleware/response.validator"
import classNames from "classnames"

type Props = {
  email: string
  setModePopup: React.Dispatch<React.SetStateAction<PopupMode>>
}

export default function ResetSessionButton({ email, setModePopup }: Props) {
  const [disabled, setDisabled] = useState(false);

  return <button
    type="button"
    disabled={disabled}
    className={classNames("btn btn-outline-warning")}
    onClick={() => {
      _destroySession(email, setDisabled, setModePopup);
    }}>{"сбросить сессию"}</button>
}

function _destroySession(
  email: string,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setModePopup: React.Dispatch<React.SetStateAction<PopupMode>>
) {
  if (!confirm(`Вы уверены, что хотите сбросить сессию для пользователя ${email}?`)) {
    return;
  }

  setDisabled(true);
  setModePopup(undefined);

  const fd = new FormData();
  fd.append('email', email);

  fetchWrapper(() => fetch(`${serviceHost('mauth')}/api/mauth/admin/user/signout`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        setModePopup("success");
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => {
      console.log(error.message);
      setModePopup("danger");
    })
    .finally(() => setDisabled(false));
}
