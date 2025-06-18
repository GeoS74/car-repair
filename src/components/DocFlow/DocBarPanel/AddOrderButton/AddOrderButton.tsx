import { useNavigate } from "react-router-dom";

import session from "../../../../libs/token.manager";
import finder from "../../../../libs/deep.finder";
import classNames from "classnames";
import styles from "./styles.module.css";

export default function AddOrderButton() {
  const navigate = useNavigate();

  const docsForCreation = _getAvailableDocumentsForCreation(session.getMe()?.roles);

  if(docsForCreation.length !== 1) return <></>;

  return <button type="button"
    className={classNames(`btn btn-outline-primary`, styles.root)}
    onClick={() => navigate('/docflow/create/doc')}
  >Создать заказ</button>
}

// возвращает массив с типами документов, доступных для создания,
// массив содержит объекты типа
//   {
//     role: {id: anyId, title: anyTitle},
//     directing: {id: anyId, title: anyTitle},
//     task: {id: anyId, title: anyTitle}
//   }
// если возвращённый массив содержит только один объект, 
// то можно однозначно сказать какой тип документа доступен пользователю для создания
function _getAvailableDocumentsForCreation(roles?: IRole[]){
  const result = [];

  if(!roles) return [];

  for(const role of roles){
    for(const directing of role.directings) {
      for(const task of directing.tasks) {
        for(const act of task.actions) {
          if(act.title === 'Создать'){
            result.push({
              role: {id: role.id, title: role.title}, 
              directing: {id: directing.id, title: directing.title}, 
              task: {id: task.id, title: task.title}
            })
          }
        }
      }
    }
  }
  return result;
}