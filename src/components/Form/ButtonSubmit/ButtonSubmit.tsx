import { useSelector } from "react-redux";
import classNames from "classnames";

type Props = {
  val?: string
}

export default function ButtonSubmit({val}: Props) {
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme;

  return <input type="submit"
    className={classNames(`mt-4 btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)}
    value={val || "Записать"} />
}