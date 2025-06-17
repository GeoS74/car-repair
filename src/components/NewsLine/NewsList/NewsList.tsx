import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import classNames from "classnames";

import session from "../../../libs/token.manager";
import NewsRow from "../NewsRow/NewsRow";
import NextSearch from "../NextSearch/NextSearch";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";

// количество отображаемых новостей
const docsLimit = 25

// для определения откуда идет переход в форму создания слайдов. Если null или undefine тогда переход с кнопки создать слайд
const stateFunction = null


export default function NewsList() {
  session.subscribe('NewsList');  
  // Получение всех новостей с сервера
  const [docs, setDocs] = useState(useLoaderData() as INews[])
  // отображает кнопку загрузить еще
  const [showNextButton, setShowNextButton] = useState(true);
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  

  return <div className={styles.root} >
    <h3>Слайды</h3>  

    <SearchForm setShowNextButton={setShowNextButton} setDocs={setDocs} limit={docsLimit}/>

    <Link to={`/newsLine/createNews`} state={{stateFunction}} className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`, styles.button)}>Создать слайд</Link>
    
    {docs?.map(news => <NewsRow key={news.id} {...news} />)}

        {docs.length > 0 ? <NextSearch
          setDocs={(newDocs: INews[]) => setDocs([...docs, ...newDocs])}
          lastId={docs[docs.length - 1]?.id}
          limit={docsLimit}
          showNextButton={showNextButton}
          setShowNextButton={setShowNextButton}
        />
          : <></>}
  </div>
}