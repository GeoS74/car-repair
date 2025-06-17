import { useState } from "react"

import EditRoleForm from "../EditRoleForm/EditRoleForm"
import styles from "./styles.module.css"

type Props = {
  currentUser: IUser,
  roles: ISimpleRow[]
}

export default function RolePane({ currentUser, roles }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(currentUser);

  return <div className={styles.root}
    onMouseEnter={_showOptionalButton}
    onMouseLeave={_showOptionalButton}
  >
    {editMode ?
      <EditRoleForm setEditMode={setEditMode} roles={roles} setUser={setUser} user={user} /> :

      <p className="mt-4">Роль: {user.roles[0]?.title || "не назначена"}

        <span className="text-muted" hidden={true}
          onClick={() => setEditMode(true)}>назначить роль</span>
      </p>
    }
  </div>
}

function _showOptionalButton(event: React.MouseEvent<HTMLParagraphElement>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement | undefined;
  if (optionalButton) {
    optionalButton.hidden = !optionalButton.hidden;
  }
}