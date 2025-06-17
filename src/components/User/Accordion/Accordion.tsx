import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import tokenManager from "../../../libs/token.manager"

import styles from "./styles.module.css"
import classNames from "classnames"

type Props = {
  user: IUser,
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
  editMode: boolean,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function Accordion({ user, setUser, editMode, setEditMode }: Props) {
  console.log(user)
  return <form onSubmit={event => _updateUserData(event, editMode, setEditMode, (editData) => setUser({ ...user, ...editData }))}
    className={classNames(styles.content, "mt-4")}>

    <div className={classNames(styles.root, "accordion")}>

      <div className="accordion-item">
        <h2 className="accordion-header" onClick={(event) => collapser(event)}>
          <span className="accordion-button">
            пользователь
          </span>
        </h2>
        <div className="accordion-collapse">
          <div className="accordion-body">
            <p>email: {user.email}</p>
            <p>ранг: {user.rank}</p>
            <p>Ф.И.О.: {editMode ?
              <input type="text"
                autoFocus
                // className="form-control"
                name="name" defaultValue={user.name || ""} /> :
              (user.name || "укажите Ф.И.О.")}
            </p>
            <p>регистрация: {user.createdAt}</p>
          </div>
        </div>
      </div>

      {/* <div className="accordion-item">
        <h2 className="accordion-header" onClick={(event) => collapser(event)}>
          <span className="accordion-button collapsed">
            система эл. документооборота
          </span>
        </h2>
        <div className="accordion-collapse collapse">
          <div className="accordion-body">
            <p>роль: {user.roles[0]?.title || "не назначена"}</p>
          </div>
        </div>
      </div> */}

    </div>
    <input type="submit" hidden />
  </form>
}

function _updateUserData(
  event: React.FormEvent<HTMLFormElement>,
  editMode: boolean,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<IUser>>
) {

  event.preventDefault();

  setEditMode(!editMode);
  if (!editMode) return;

  const fd = new FormData(event.currentTarget)

  fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/user`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async (response) => {
      if (response.ok) {
        const res = await response.json()
        setUser(res)
        return;
      }

      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}

function collapser(event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) {
  event.currentTarget.firstElementChild?.classList.toggle("collapsed")
  event.currentTarget.nextElementSibling?.classList.toggle("collapse")
}