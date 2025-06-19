import { Link } from "react-router-dom";

import OptionalHeader from "./OptionalHeader/OptionalHeader";
import FileLinkedList from "../DocPage/FileLinkedList/FileLinkedList";
import Description from "../DocPage/Description/Description";
import Author from "../DocPage/Author/Author";
import classNames from "classnames"
import styles from "./styles.module.css"
import Status from "../DocPage/Status/Status";

export default function DocRowOrder({ ...doc }: IDoc) {

  return <div className={classNames(styles.root, "mt-2")}>

    <OptionalHeader {...doc} />

    <Status statusCode={doc.statusCode} />

    <h4 className="mt-2"><Link to={`/docflow/${doc.id}`} className="nav-link">{doc.title}</Link></h4>

    <Description {...doc} limit={350} />

    <FileLinkedList files={doc.files} />

    <Author {...doc} />
  </div>
}
