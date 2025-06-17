import { useState } from "react"
import { useSelector } from "react-redux";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  setDocs: React.Dispatch<React.SetStateAction<INews[]>>
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>
  limit: number
}

export default function SearchForm({ setShowNextButton, setDocs, limit }: Props) {
  const [disabled, setDisabled] = useState(false)
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme  

  return <form id="searchForm" className={styles.root}
    onSubmit={(event) => {
      onSubmit(event, setDisabled, setDocs, setShowNextButton, limit)
    }}>

    <fieldset disabled={disabled}>
      <input type="search" name="query" className="form-control" placeholder="Введите название документа" />
      <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Поиск" />  
    </fieldset>
  </form>
}

async function onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setDocs: React.Dispatch<React.SetStateAction<INews[]>>,
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>,
  limit: number
) {

  event.preventDefault()

  const fd = new FormData(event.target as HTMLFormElement)

  sessionStorage.setItem('lastQuery', fd.get('query') as string)

  setDisabled(true)

  fetchWrapper(() => fetch(`${serviceHost('mnote')}/api/mnote/search/note/?search=${fd.get('query')}&limit=${limit}&last=`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      setShowNextButton(true)
      if (response.ok) {
        const res = await response.json()
        setDocs(res)
        setShowNextButton(!!res.length)
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}