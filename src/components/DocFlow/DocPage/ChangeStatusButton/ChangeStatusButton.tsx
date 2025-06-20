import { useState } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../../../store/index";
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
  statusCode?: number,
  addComment: (comment: IComment) => void
}

export default function ChangeStatusButton({ id, statusMode, statusCode, setDoc, directing, task, addComment }: Props) {
  const statuses = useSelector((state: StoreState) => state.status.items);
  const [disabled, setDisabled] = useState(false);

  const newStatus = _getNewStatusCode(statuses, statusMode, statusCode);

  if(!newStatus) {
    return <></>;
  }

  const action = statusMode === 'next' ? 'Следующий этап' : 'На доработку';

  // проверяет может ли пользователь менять статусы у данного типа документов
  if (_actionFinder(session.getMe()?.roles[0], directing.id, task.id, 'Изменять статусы')) {

    return <button
      type="button"
      disabled={disabled}
      className={classNames("btn", statusMode === 'next' ? "btn-success" : "btn-outline-warning")}
      onClick={() => {
        _chanchging(id, newStatus.code, setDoc, setDisabled);
        _autoComments(id, newStatus.title, addComment, statusMode);
      }}>{action}</button>
  }
  return <></>
}

function _getNewStatusCode(
  statuses: IStatus[],
  statusMode: ChangeStatusModeMode,
  statusCode?: number
){
  if(!statusCode) return;

  const currentIndex = statuses.findIndex(s => s.code === statusCode);

  if(statusMode === 'next') {
    return statuses[currentIndex+1] || undefined;
  }

  return statuses[currentIndex-1] || undefined;
}

function _chanchging(
  id: string,
  newStatusCode: number,
  setDoc: React.Dispatch<React.SetStateAction<IDoc>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
) {
  setDisabled(true);

  const fd = new FormData();
  fd.append('statusCode', newStatusCode.toString());

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/changeStatus/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        setDoc(res);
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
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

function _autoComments(
  id: string,
  newStatusTitle: string,
  addComment: (comment: IComment) => void,
  statusMode: ChangeStatusModeMode
){
  const fd = new FormData();
  fd.append('docId', id.toString());

  const action = statusMode === 'next' ? 'перевёл заказ на следующий статус' : 'вернул назад на этап';

  fd.append('comment', `${action} "${newStatusTitle}"`);

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/doccomments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenManager.getAccess()}`
      },
      body: fd
    }))
      .then(responseNotIsArray)
      .then(async response => {
        if (response.ok) {
          const res = await response.json();
          addComment(res);
          return;
        }
        throw new Error(`response status: ${response.status}`)
      })
      .catch(error => console.log(error.message));
}