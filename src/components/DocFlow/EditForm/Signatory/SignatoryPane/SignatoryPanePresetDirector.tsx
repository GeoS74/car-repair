import { useState } from "react";

import tokenManager from "../../../../../libs/token.manager"
import serviceHost from "../../../../../libs/service.host"
import fetchWrapper from "../../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../../middleware/response.validator"

import styles from "./styles.module.css"

type Props = {
  typeDoc: DocType
}

export default function DepSignatoryPaneInvoice({ typeDoc }: Props) {
  const [director, setDirector] = useState<IDocSignatory>();

  if (!director) {
    _searchDirector(typeDoc, setDirector);
    return <></>
  }

  return <div className={styles.root}>
    <h4 className="mt-4">На утверждении:</h4>
    <ul>
      <li>{`${director.position} ${director.name}`}

        <input type="hidden" name={`acceptor[${director.uid}]`} defaultValue={director.accept ? "on" : ""} />
      </li>
    </ul>
  </div>
}

function _searchDirector(
  typeDoc: DocType,
  setDirector: React.Dispatch<React.SetStateAction<IDocSignatory | undefined>>
) {

  const q = [
    `search=директор`,
    `directing=${typeDoc.directing.id}`,
    `task=${typeDoc.task?.id}`,
    `limit=1`,
    `acceptor=1`
  ];

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/user/search/?${q.join('&')}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        setDirector(res[0]);
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message));
}