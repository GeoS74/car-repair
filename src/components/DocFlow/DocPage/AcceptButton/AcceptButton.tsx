import { useState } from "react";
import session from "../../../../libs/token.manager"
import tokenManager from "../../../../libs/token.manager"
import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../middleware/response.validator"
import classNames from "classnames"

type Props  = {
  id: string
  acceptor: IDocSignatory[]
  recipient: IDocSignatory[]
  signatoryMode: SignatoryMode
  setDoc: React.Dispatch<React.SetStateAction<IDoc>>
  directing: ISimpleRow
  task: ISimpleRow
}

export default function AcceptButton({ id, acceptor, recipient, signatoryMode, setDoc, directing, task }: Props) {
  const [disabled, setDisabled] = useState(false)
  const list = signatoryMode === 'acceptor' ? acceptor : recipient;

  const action = signatoryMode === 'acceptor' ? 'Согласовать' : 'Ознакомиться';
  if(_actionFinder(session.getMe()?.roles[0], directing.id, task.id, action)){
    
    // обязательна проверка на  false, т.к. если пользователя нет в списке подписантов то find вернёт undefined... прикольно звучит: find вернёт undefined
    if ((list.find(e => e.uid === session.getMe()?.uid))?.accept === false) {
      return <button 
        type="button" 
        disabled={disabled}
        className={classNames("btn", signatoryMode === 'acceptor' ? "btn-success": "btn-info") }
        onClick={() => accepting(id, signatoryMode, setDoc, setDisabled)}>{signatoryMode === 'acceptor' ? "Подписать" : "Ознакомиться"}</button>
    }
  }
  return <></>
}

function accepting(
  id: string,
  signatoryMode: SignatoryMode,
  setDoc: React.Dispatch<React.SetStateAction<IDoc>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
){
  setDisabled(true);
  const path = signatoryMode === 'acceptor' ? "accepting": "recipienting";
  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/${path}/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
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