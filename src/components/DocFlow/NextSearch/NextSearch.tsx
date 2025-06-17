import { useState } from "react"
import { useSelector } from "react-redux";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import classNames from "classnames";

type Props = {
  querySearch: string,
  setDocs: (newDocs: IDoc[]) => void
  lastId: string
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NextSearch({ setDocs, lastId, querySearch, setShowNextButton }: Props) {
  const [disabled, setDisabled] = useState(false);
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme;

  return <button
        disabled={disabled}
        onClick={() => onSubmit(querySearch, lastId, setDisabled, setDocs, setShowNextButton)}
        className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4`)}
        >Загрузить ещё</button>
}

async function onSubmit(
  querySearch: string,
  lastId: string,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setDocs: (newDocs: IDoc[]) => void,
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>
) {

  setDisabled(true)

  // const query = sessionStorage.getItem('lastQuery') || "";

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/search/doc/${querySearch}&last=${lastId}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setDocs(res)

        if (!res.length) {
          setShowNextButton(false)
        }
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));

}
