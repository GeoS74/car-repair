import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

export default function CancelButton() {
  const navigate = useNavigate();
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme;

  return <span
    className={classNames(`mt-4 btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)}
    onClick={() => navigate(-1)}
  >Отмена</span>
}