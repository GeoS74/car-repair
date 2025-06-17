import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import classNames from "classnames";
import styles from "./styles.module.css"

export default function SearchForm() {
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme;
  const navigate = useNavigate();

  return <form id="searchForm" className={styles.root}
    onSubmit={(event) => {
      event.preventDefault();
      navigate(`/catalog/?query=${event.currentTarget.search.value}`)
    }}>
    
    <fieldset>
      <input type="search" name="search" className="form-control" placeholder="Каталожный номер или артикул позиции..." />

      <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Поиск" />
    </fieldset>
  </form>
}
