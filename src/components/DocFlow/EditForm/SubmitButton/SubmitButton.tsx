import { useSelector } from "react-redux";
import classNames from "classnames";

export default function SubmitButton() {
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme;

  return <input type="submit"
    className={classNames(`mt-4 btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)}
    value="Записать" />
}