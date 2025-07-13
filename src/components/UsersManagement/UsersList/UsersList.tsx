import { useLoaderData } from "react-router-dom";
import session from "../../../libs/token.manager";
import styles from "./styles.module.css";
import { useState } from "react";
import UserSearchForm from '../UserSearchForm/UserSearchForm';
import UserRow from "../UserRow/UserRow";
import NextSearch from "../NextSearch/NextSearch";
import ButtonAdding from "../../Common/ButtomAdding/ButtonAdding";

export default function UsersList() {
  session.subscribe('UsersList');

  const [users, setUsers] = useState(useLoaderData() as IUser[]);
  const [showNextButton, setShowNextButton] = useState(true);
  const [query, setQuery] = useState('');

  return <div className={styles.root} >
    {/* <h3 className="mb-4">Список пользователей</h3> */}

     

    <UserSearchForm
      setSearchResult={setUsers}
      setShowNextButton={setShowNextButton} 
      setQuery={setQuery}
      />

      <ButtonAdding
        to='/users/management/create/user'
        val='Создать пользователя'
      />

    {users?.map(user => <UserRow key={user.uid} {...user} />)}

    {users.length > 0 && showNextButton ?
      <NextSearch
        setUsers={(newUsers: IUser[]) => setUsers([...users, ...newUsers])}
        querySearch={query}
        lastId={users[users.length - 1]?.uid}
        setShowNextButton={setShowNextButton}
      />
      : <></>}

  </div>
}



