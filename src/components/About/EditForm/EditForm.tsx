import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import EditButton from "../EditButton/EditButton";

type Props = {
  about: IAbout | undefined
  setAbout: React.Dispatch<React.SetStateAction<IAbout | undefined>>
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  alias: string
}

export default function EditForm({ about, setAbout, editMode, setEditMode, alias }: Props) {
  return <form
    onSubmit={(event) => { _onSubmit(event, setEditMode, about, setAbout) }}>

    <div className="form-group">
      <label className="form-label mt-4">Редактировать  страницу (markdown)</label>
      <textarea className="form-control" name="mdInfo" defaultValue={about?.mdInfo || ""}></textarea>
      <input type="hidden" name="alias" defaultValue={alias} />
    </div>

    <EditButton editMode={editMode} />
  </form>
}

async function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  about: IAbout | undefined,
  setAbout: React.Dispatch<React.SetStateAction<IAbout | undefined>>
) {

  event.preventDefault()
  setEditMode(false)

  await fetchWrapper(() => _query(new FormData(event.target as HTMLFormElement), about?.alias))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setAbout(res)
        return;
      }
    })
    .catch(() => console.log('error: не удалось обновить данные страницы'))
}

function _query(
  fd: FormData,
  alias: string | undefined
) {
  return fetch(`${serviceHost("informator")}/api/informator/about/${alias || ""}`, {
    method: alias ? 'PATCH' : 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  })
}

