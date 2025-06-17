import { useState } from "react";
import { useSelector } from "react-redux";


import tokenManager from "../../../../libs/token.manager";
import serviceHost from "../../../../libs/service.host";
import fetchWrapper from "../../../../libs/fetch.wrapper";
import { responseNotIsArray } from "../../../../middleware/response.validator"
import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  roles: ISimpleRow[],
  setUser: React.Dispatch<React.SetStateAction<IUser>>
  user: IUser
}

export default function EditRoleForm({ setEditMode, roles, setUser, user }: Props) {
  const [disabled, setDisabled] = useState(false);
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  return <form onSubmit={(event) => _submit(event, setEditMode, setDisabled, setUser)} className={styles.root}>
    <fieldset className="form-group" disabled={disabled}>
      <select name="roleId" className="form-select btn-outline-light mt-2" defaultValue={user.roles[0]?.id}>
        <option value="">Выберите роль</option>
        {_mekeOptions(roles)}
      </select>
      <input type="hidden" value={user.email} name="email" />      
      <input type="submit" value="Установить роль" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-2`)} />        
    </fieldset>
  </form>
}





function _submit(
  event: React.FormEvent<HTMLFormElement>,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<IUser>>
) {
  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

  fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/setting/access/bundle/role`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async (response) => {
      if (response.ok) {
        const user = await response.json()
        setUser(user)
        return;
      }

      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => {
      setDisabled(false);
      setEditMode(false);
    });
}

function _mekeOptions(roles: ISimpleRow[]) {
  return roles.map((role, index) => <option value={role.id} key={index}>{role.title}</option>)
}