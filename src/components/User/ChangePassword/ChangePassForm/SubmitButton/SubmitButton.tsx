import { useSelector } from "react-redux";
import classNames from "classnames";

export default function SubmitButton() {
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme;

  return <input type="submit" className={classNames(`btn mt-4 mb-2 btn-outline-${theme === 'light' ? 'primary' : 'light'}`)}
  value="Изменить пароль"
/>
}