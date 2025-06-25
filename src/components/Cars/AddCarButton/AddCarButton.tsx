import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";
import styles from "./styles.module.css";

export default function AddCarButton() {
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme
  const navigate = useNavigate();

  return <button type="button"
    className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`, styles.root)}
    onClick={() => navigate('/cars/create/car')}
  >Добавить автомобиль</button>
}