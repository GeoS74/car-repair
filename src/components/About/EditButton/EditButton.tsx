import classNames from "classnames";
import { useSelector } from "react-redux";

type Props = {
  editMode: boolean
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditButton({ editMode, setEditMode }: Props) {
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  return <input
        type="submit"
        className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4`)}
        onClick={() => setEditMode ? setEditMode(!editMode) : undefined}
        value={editMode ? "Сохранить изменения" : "Редактировать страницу"}
      />
}