import { useState } from "react";
import { useSelector } from "react-redux";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  serviceName: ServiceName,
  id: number,
  value: string,
  placeholder: string,
  setValueRow: React.Dispatch<React.SetStateAction<string | undefined>>,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  api: string,
  addRow?: (row: ISimpleRow) => void,
}

export default function EditForm({ serviceName, id, setValueRow, setIdActiveRow, value, placeholder, api, addRow }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [disabled, setDisabled] = useState(false)
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  return <form
    onSubmit={(event) => { _onSubmit(event, serviceName, id, api, setValueRow, setIdActiveRow, setError, setDisabled, addRow) }}
    className={styles.root}>

    <fieldset disabled={disabled}>
      <input type="text" name="title" className="form-control" placeholder={placeholder} defaultValue={value} autoFocus={true} />

          <>
            <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Добавить" />

            <span className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} onClick={() => setIdActiveRow(-1)}>Отмена</span>
          </>

    </fieldset>
    {error ? <strong>{error}</strong> : ''}
  </form>
}



function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  serviceName: ServiceName,
  id: number,
  api: string,
  setValueRow: React.Dispatch<React.SetStateAction<string | undefined>>,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  addRow?: (row: ISimpleRow) => void) {

  event.preventDefault()
  setDisabled(true)

  const fd = new FormData(event.currentTarget)

  fetchWrapper(() => fetch(`${serviceHost(serviceName)}${api}/${addRow ? '' : id}`, {
    method: addRow ? 'POST' : 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setIdActiveRow(-1)
        setError(undefined)

        if (addRow) {
          addRow(res)
          return;
        }

        setValueRow(res.title)
        return;
      }
      else if (response.status === 400) {
        const res = await response.json()
        setError(res.error)
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}