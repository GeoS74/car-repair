import { useState } from "react"
import { ReactComponent as NotImage } from "./icons/tools.svg";
import session from "../../../../libs/token.manager"
import tokenManager from "../../../../libs/token.manager"
import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../middleware/response.validator"
import styles from "./styles.module.css"

export default function Image({ id, photo }: IProduct) {
  session.subscribe('ProductImage');
  const [photoCard, setPhoto] = useState(photo);

  if (session.getMe()?.rank === 'admin') {
    return <div className={styles.root}>
      <form className={styles.root} onChange={event => _changePhoto(event, setPhoto, id)}>
        <div onClick={_fileSelection}>
          {!photoCard ?
            <>
              <NotImage className={styles.svg} />
              <p>товар на фотосесии</p>
            </>
            : <img src={`${serviceHost('bridge')}/api/bridge/card/photo/${photoCard}`} loading="lazy" onClick={_fileSelection} />
          }
        </div>

        <input type="file" accept="image/*" name="photo" hidden />
      </form>
    </div>
  }

  return <div className={styles.root}>
    {!photoCard ?
      <>
        <NotImage className={styles.svg} />
        <p>товар на фотосесии</p>
      </>
      : <img src={`${serviceHost('bridge')}/api/bridge/card/photo/${photoCard}`} loading="lazy" />}
  </div>
}

function _changePhoto(
  event: React.FormEvent<HTMLFormElement>,
  setPhoto: React.Dispatch<React.SetStateAction<string>>,
  id: number
) {
  const fd = new FormData(event.currentTarget)

  fetchWrapper(() => fetch(`${serviceHost("bridge")}/api/bridge/card/${id}/photo`, {
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
  (event.currentTarget.nextElementSibling as HTMLInputElement)?.click();
}