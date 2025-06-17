import { useState } from "react";
import { useNavigate } from "react-router-dom";

import tokenManager from "../../../../libs/token.manager";
import serviceHost from "../../../../libs/service.host";
import fetchWrapper from "../../../../libs/fetch.wrapper";
import { responseNotIsArray } from "../../../../middleware/response.validator"
import session from "../../../../libs/token.manager"
import styles from "./styles.module.css";

type Props = {
  title: string
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>
  queryString: string
};

export default function DocBar({ title, Icon, queryString }: Props) {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  if (session.getMe() && !count) {
    getCountDocs(queryString, setCount)
  }

  return <div className={styles.root}
    onClick={() => navigate(`/docflow/list/${queryString}`, {
      state: {titleDocList: title}
    })}
  >
    <h5>{title}</h5>
    <div className="mt-3"><Icon className={styles.svg}/></div>
    <p>{count}</p>
  </div>
}

function getCountDocs(
  queryString: string,
  setCount: React.Dispatch<React.SetStateAction<number>>
) {
  fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/docflow/search/doc/count/${queryString}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async (response) => {
      if (response.ok) {
        const res = await response.json()
        setCount(res.count);
        return;
      }

      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}
