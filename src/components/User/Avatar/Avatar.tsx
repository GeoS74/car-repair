import { useState } from "react"

import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import tokenManager from "../../../libs/token.manager"
import styles from "./styles.module.css"
import { ReactComponent as Person } from "./image/person.svg"

type Props = {
  userPhoto?: string,
}

export default function Avatar({ userPhoto }: Props) {
  const [photo, setPhoto] = useState(userPhoto)

  return <form className={styles.root} onChange={event => _changePhoto(event, setPhoto)}>
    <div onClick={_fileSelection}>
      {!photo ?
        <Person width="150" height="150" />
        : <img src={`${serviceHost('informator')}/api/informator/user/photo/${photo}`} loading="lazy" onClick={_fileSelection} />
      }
    </div>

    <input type="file" accept="image/*" name="photo" hidden />
  </form>
}

function _changePhoto(
  event: React.FormEvent<HTMLFormElement>,
  setPhoto: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  const fd = new FormData(event.currentTarget)

  fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
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
        setPhoto(res.photo)
        return;
      }

      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}

function _fileSelection(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
  (event.currentTarget.nextElementSibling as HTMLInputElement)?.click()
}