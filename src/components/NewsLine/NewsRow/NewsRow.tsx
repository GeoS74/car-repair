import { Link } from "react-router-dom";

import classNames from "classnames"
import styles from "./styles.module.css"
import { Converter } from "md-conv";
import serviceHost from "../../../libs/service.host"
import {ReactComponent as IconYes} from "../../../img/SVG/yes.svg"
import {ReactComponent as IconNo} from "../../../img/SVG/no.svg"

const converter = new Converter()
const limit =350

export default function DocRow(news: INews) {
  return (
  <div className={classNames(styles.root, "mt-2")}>
    <Link to={`/newsLine/${news.id}`} className="nav-link">
      <h4 className="mt-2">{news.title}</h4>
        {news.isPublic === true 
          ? <div className={styles.isPublic}><IconYes width="15px" height="15px" className={styles.svgButton}/><p>Опубликован</p></div> 
          : <div className={styles.isPublic}><IconNo width="15px" height="15px" className={styles.svgButton}/><p>Не опубликован</p></div>}
      <div className={styles.content}>     
        {news.files[0]?.fileName
          ? <img src={`${serviceHost('mnote')}/api/mnote/static/images/${news.files[0].fileName}`} 
                alt="foto" 
                className={styles.foto}/> 

          : <div className={styles.foto}>Слайд не прикреплен</div>}
        {news.message.length < 250 
          ? <p className="mt-4"
          dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(_cut(news.message, limit)) }}
        ></p>

          : <div className={styles.sliceMessage}><p>{sliceMessage(news.message)}<Link to={`/newsLine/${news.id}`} className="nav-link">читать далее...</Link></p></div>}
      </div>
    </Link>    
  </div>
)}

function sliceMessage(message: string) {
    if (message.indexOf(' ', 251) !== -1) {
      return message.slice(0, message.indexOf(' ', 251))
    } else {
      return message
    }
  }

  function _cut(text: string, limit?: number) {
    return (limit && text.length > limit) ? text.substring(0, text.indexOf(".", limit) + 1) : text;
  }