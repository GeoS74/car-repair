import { useState } from "react";

import tokenManager from "../../../../libs/token.manager"
import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../middleware/response.validator"
import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

export default function SearchUser({setUsers}: Props) {
  const [disabled, setDisabled] = useState(false)

  return <form
    className={classNames(styles.root, "mb-4")}
    onSubmit={(event) => _searchUser(event, setUsers, setDisabled)}>

    <fieldset disabled={disabled}>
      <input type="search" name="email" className="form-control mt-4" placeholder="поиск пользователя по e-mail" />
    </fieldset>
  </form>
}

function _searchUser(
  event: React.FormEvent<HTMLFormElement>,
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>) {

  event.preventDefault()
  setDisabled(true)

  const fd = new FormData(event.currentTarget)
  
  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/user/search/?search=${fd.get('email')}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setUsers(res)
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}