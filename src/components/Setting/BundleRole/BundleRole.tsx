import { useLoaderData } from "react-router-dom";

import RolePane from "./RolePane/RolePane"
import SearchUserForm from "./SearchUserForm/SearchUserForm"
import styles from "./styles.module.css"
import { useState } from "react";

export default function BundleRole() {
  const [usersAll, roles] = useLoaderData() as [IUser[], ISimpleRow[]];

  const [users, setUsers] = useState(usersAll)

  return <div className={styles.root}>
    <h3 className="mb-4">Привязка ролей пользователей</h3>

    <SearchUserForm setUsers={setUsers}/>

    {/* если в качестве key использовать index элемента, то при поиске роль будет сохраняться между элементами  */}
    {users.map(user => <div className="mt-2" key={user.email}>

      <h5>Пользователь: {user.name}</h5>
      <p>email: {user.email}</p>
      <RolePane currentUser={user} roles={roles} />
    </div>
    )}
  </div>
}