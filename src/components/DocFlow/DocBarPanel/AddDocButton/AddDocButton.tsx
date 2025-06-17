import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";
import styles from "./styles.module.css";

export default function AddDocButton() {
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme
  const navigate = useNavigate();

  return <button type="button"
    className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`, styles.root)}
    onClick={() => navigate('/docflow/create/doc')}
  >Создать документ</button>
}