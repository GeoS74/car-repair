import { useState } from "react";
import session from "../../../../libs/token.manager"
import tokenManager from "../../../../libs/token.manager"
import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../middleware/response.validator"
import classNames from "classnames"

type Props = {
  id: string
  statusMode: ChangeStatusModeMode
  setDoc: React.Dispatch<React.SetStateAction<IDoc>>
  directing: ISimpleRow
  task: ISimpleRow
}

export default function ChangeStatusButton({ id, statusMode, setDoc, directing, task }: Props) {
  const [disabled, setDisabled] = useState(false)

  const action = statusMode === 'next' ? 'Завершить этап' : 'На доработку';

  // проверяет может ли пользователь менять статусы у данного типа документов
  if (_actionFinder(session.getMe()?.roles[0], directing.id, task.id, 'Изменять статусы')) {

    return <button
      type="button"
      disabled={disabled}
      className={classNames("btn", statusMode === 'next' ? "btn-success" : "btn-info")}
      onClick={() => chanchging(id, statusMode, setDoc, setDisabled)}>{action}</button>
  }
  return <></>
}

function chanchging(
  id: string,
  statusMode: ChangeStatusModeMode,
  setDoc: React.Dispatch<React.SetStateAction<IDoc>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
) {
  setDisabled(true);
  // const path = statusMode === 'acceptor' ? "accepting" : "recipienting";
  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/changeStatus/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    // .then(responseNotIsArray)
    // .then(async response => {
    //   if (response.ok) {
    //     const res = await response.json();
    //     setDoc(res);
    //     return;
    //   }
    //   throw new Error(`response status: ${response.status}`)
    // })
    // .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}

function _actionFinder(
  role?: IRole,
  idDirecting?: number,
  idTask?: number,
  action?: ActionMode,
): boolean {
  return !!role
    ?.directings.find(e => e.id === idDirecting)
    ?.tasks.find(e => e.id === idTask)
    ?.actions.find(e => e.title === action);
}