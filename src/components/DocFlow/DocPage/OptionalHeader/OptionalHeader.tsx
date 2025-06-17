import { useNavigate } from "react-router-dom";
import session from "../../../../libs/token.manager"
import tokenManager from "../../../../libs/token.manager"
import fetchWrapper from "../../../../libs/fetch.wrapper";
import serviceHost from "../../../../libs/service.host";
import { responseNotIsArray } from "../../../../middleware/response.validator";
import { date } from "../../../../libs/formatter";

import { ReactComponent as IconEdit } from "./icons/wrench.svg";
import { ReactComponent as IconDelete } from "./icons/trash.svg";
import styles from "./styles.module.css"

export default function OptionalHeader({ id, directing, task, num, createdAt }: IDoc) {
  const navigate = useNavigate();

  return <div className={styles.root}>
    <div><small> № {num || 'б/н'} от {date(createdAt)}</small></div>
    <div>
      <small>{directing.title} / {task.title}</small>

      {_actionFinder(session.getMe()?.roles[0], directing.id, task.id, 'Редактировать') ?
        <IconEdit className={styles.svg}
          onClick={() => navigate(`/docflow/edit/doc/${id}`)}
        /> : <></>}

      {_actionFinder(session.getMe()?.roles[0], directing.id, task.id, 'Удалить') ?
        <IconDelete className={styles.svg}
          onClick={async () => {
            // ninja code ;)
            await _deleteDoc(id) ? navigate(-1) : null;
          }} /> : <></>}
    </div>
  </div>
}

async function _deleteDoc(id: string) {
  if (!confirm('Удалить этот документ?')) {
    return false;
  }

  return fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        return true;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => {
      console.log(error.message);
      return false;
    })
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