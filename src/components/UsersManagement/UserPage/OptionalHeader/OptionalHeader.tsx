import { useNavigate } from "react-router-dom";
import session from "../../../../libs/token.manager"
import tokenManager from "../../../../libs/token.manager"
import fetchWrapper from "../../../../libs/fetch.wrapper";
import serviceHost from "../../../../libs/service.host";
import { responseNotIsArray } from "../../../../middleware/response.validator";

import { ReactComponent as IconEdit } from "./icons/wrench.svg";
import { ReactComponent as IconDelete } from "./icons/trash.svg";
import styles from "./styles.module.css"

export default function OptionalHeader({ uid, createdAt }: IUser) {
  const navigate = useNavigate();

  return <div className={styles.root}>
    <div><small></small></div>
    <div>
      <small></small>

      {session.getMe()?.rank === 'admin' ?
        <IconEdit className={styles.svg}
          onClick={() => navigate(`/users/management/edit/user/${uid}`)}
        /> : <></>}

      {/* {session.getMe()?.rank === 'admin' ?
        <IconDelete className={styles.svg}
          onClick={async () => {
            // ninja code ;)
            await _delete(id) ? navigate(`/cars`) : null;
          }} /> : <></>} */}
    </div>
  </div>
}

// async function _delete(id: string) {
//   if (!confirm('Удалить этот автомобиль?')) {
//     return false;
//   }

//   return fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/cars/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Authorization': `Bearer ${tokenManager.getAccess()}`
//     }
//   }))
//     .then(responseNotIsArray)
//     .then(async response => {
//       if (response.ok) {
//         return true;
//       }
//       if(response.status === 400) {
//         alert('Этот автомобиль нельзя удалять! Есть документы, которые на него ссылаются!')
//       }
//       throw new Error(`response status: ${response.status}`)
//     })
//     .catch(error => {
//       console.log(error.message);
//       return false;
//     })
// }