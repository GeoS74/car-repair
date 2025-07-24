import { useState } from "react"
import { useSelector } from "react-redux";
import { StoreState } from "../../../store/index";
import session from "../../../libs/token.manager";

import fetchWrapper from "../../../libs/fetch.wrapper";
import serviceHost from "../../../libs/service.host";
import tokenManager from "../../../libs/token.manager";
import { responseNotIsArray } from "../../../middleware/response.validator";

import SelectDefault from "../../Form/Select/SelectDefault";
import SelectStatus from "../../Form/Select/SelectStatus";
// import CheckBoxDefault from "../../Form/CheckBox/CheckBoxDefault";
import CalendarPane from "./CalendarPane/CalendarPane";

import classNames from "classnames";
import styles from "./styles.module.css"

type Props = {
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>
  setSearchResult: React.Dispatch<React.SetStateAction<IDoc[]>>
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function DocSearchForm({ setShowNextButton, setSearchResult, setQuery }: Props) {
  const [disabled, setDisabled] = useState(false);
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme;
  const statuses = useSelector((state: StoreState) => state.status.items);
  const directings = session.getMe()?.roles[0]?.directings;

  const [resetKey, setResetKey] = useState(1);

  return <form id="searchForm" className={styles.root}
    onSubmit={(event) => {
      setShowNextButton(false)
      onSubmit(event, setDisabled, setSearchResult, setQuery, setShowNextButton)
    }}>

    <fieldset disabled={disabled}>
      <input
        key={resetKey + 1}
        type="search"
        name="query"
        className="form-control"
        placeholder="Поиск документов ..." />

      <SelectStatus
        key={resetKey + 2}
        prefix="statusCode"
        // label="Статус заявки:"
        options={statuses}
        defaultOptionTitle="Выберите этап"
      />

      {
        directings && directings.length > 1 ?
          <SelectDefault
            key={resetKey + 3}
            prefix="directing"
            // label="Подразделение:"
            options={directings}
            defaultOptionTitle="Выберите подразделение"
          /> : <></>
      }

      <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Поиск" />
      <span
        className={classNames(`btn btn-outline-secondary`)}
        onClick={() => setResetKey(resetKey + 1)}
      >Сбросить</span>
    </fieldset>

    <fieldset disabled={disabled} className="mt-4">

      {/* <CheckBoxDefault
        prefix="author"
        label="мои заявки"
      /> */}

      <CalendarPane key={resetKey + 4} />

    </fieldset>
  </form>
}

function _makeQueryString(fd: FormData) {
  const query = [];

  if (fd.get('query')) {
    query.push(`search=${fd.get('query')}`);
  }
  if (fd.get('statusCode')) {
    query.push(`statusCode=${fd.get('statusCode')}`);
  }
  if (fd.get('directing')) {
    query.push(`directing=${fd.get('directing')}`);
  }
  if (fd.get('author')) {
    query.push(`author=1`);
  }
  if (fd.get('calendar')) {
    query.push(`calendar=${fd.get('calendar')}`);
  }

  return '?' + query.join('&');
}

async function onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchResult: React.Dispatch<React.SetStateAction<IDoc[]>>,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.target as HTMLFormElement);

  const query = _makeQueryString(fd);

  setQuery(query);

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/search/doccar/${query}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        setSearchResult(res);

        if (res.length > 0) {
          setShowNextButton(true);
        }
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));

}
