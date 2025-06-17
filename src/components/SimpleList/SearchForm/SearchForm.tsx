import { useState } from "react";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import styles from "./styles.module.css"

type Props = {
  serviceName: ServiceName,
  api: string,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  setRows: React.Dispatch<React.SetStateAction<ISimpleRow[]>>,
  placeholderSearch?: string,
}

export default function SearchForm({ serviceName, api, setIdActiveRow, setRows, placeholderSearch }: Props) {
  const [disabled, setDisabled] = useState(false)

  return <form
    className={styles.root}
    onSubmit={(event) => _searchRow(event, serviceName, api, setIdActiveRow, setRows, setDisabled)}>

    <fieldset disabled={disabled}>
      <input type="search" name="query" className="form-control mt-4" placeholder={placeholderSearch || ""} />
    </fieldset>
  </form>
}

function _searchRow(
  event: React.FormEvent<HTMLFormElement>,
  serviceName: ServiceName,
  api: string,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  setRows: React.Dispatch<React.SetStateAction<ISimpleRow[]>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>) {

  event.preventDefault()
  setDisabled(true)

  const fd = new FormData(event.currentTarget)
  
  fetchWrapper(() => fetch(`${serviceHost(serviceName)}${api}/?title=${fd.get('query')}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setIdActiveRow(-1)
        setRows(res)
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}