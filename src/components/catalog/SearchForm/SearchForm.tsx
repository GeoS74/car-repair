import { useState } from "react"
import { useSelector } from "react-redux";

import classNames from "classnames";
import styles from "./styles.module.css"
import fetcher from "../fetcher"

type Props = {
  setHiddenNextSearch: React.Dispatch<React.SetStateAction<boolean>>
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>
  offset: number
  limit: number
}

export default function SearchForm({setHiddenNextSearch, setSearchResult, offset, limit }: Props) {
  const [disabled, setDisabled] = useState(false)
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  const defaultValue = new URL(location.href).searchParams.get('query') || "";

  return <form id="searchForm" className={styles.root}
    onSubmit={(event) => {
      setHiddenNextSearch(false)
      onSubmit(event, setDisabled, setSearchResult, offset, limit)
    }}>
    
    <fieldset disabled={disabled}>
      <input type="search" name="query" className="form-control" placeholder="Каталожный номер или артикул позиции..." defaultValue={defaultValue}/>

      <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Поиск" />
    </fieldset>
  </form>
}

async function onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>,
  offset: number,
  limit: number) {

  event.preventDefault()

  const fd = new FormData(event.target as HTMLFormElement)

  sessionStorage.setItem('lastQuery', fd.get('query') as string)

  setDisabled(true)

  const result = await fetcher(fd.get('query') as string, offset, limit)
    .finally(() => setDisabled(false));

  setSearchResult(result)
}