import { useState } from "react"
import { useSelector } from "react-redux";

import fetchWrapper from "../../../libs/fetch.wrapper";
import serviceHost from "../../../libs/service.host";
import tokenManager from "../../../libs/token.manager";
import { responseNotIsArray } from "../../../middleware/response.validator";
import classNames from "classnames";
import styles from "./styles.module.css"

type Props = {
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>
  setSearchResult: React.Dispatch<React.SetStateAction<IUser[]>>
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function CarSearchForm({ setShowNextButton, setSearchResult, setQuery }: Props) {
  const [disabled, setDisabled] = useState(false)
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme

  return <form id="searchForm" className={styles.root}
    onSubmit={(event) => {
      setShowNextButton(false)
      onSubmit(event, setDisabled, setSearchResult, setQuery, setShowNextButton)
    }}>

    <fieldset disabled={disabled}>
      <input type="search" name="query" className="form-control" placeholder="Введите имя или email пользователя ..." />

      <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Поиск" />
    </fieldset>
  </form>
}

async function onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchResult: React.Dispatch<React.SetStateAction<IUser[]>>,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.target as HTMLFormElement);

  setQuery(fd.get('query')?.toString() || '');

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/user/search/?search=${fd.get('query')}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
  .then(responseNotIsArray)
  .then(async response => {
      if (response.ok) {
        const res = await response.json();
        setSearchResult(res);

        if(res.length > 0) {
          setShowNextButton(true);
        }
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));

}
