import { Link } from "react-router-dom";

import OptionalHeader from "./OptionalHeader/OptionalHeader";
import FileLinkedList from "../DocPage/FileLinkedList/FileLinkedList";
// import Description from "../DocPage/Description/Description";
import Author from "../DocPage/Author/Author";
import classNames from "classnames"
import styles from "./styles.module.css"
import Status from "../DocPage/Status/Status";

export default function DocRowOrder({ ...doc }: IDoc) {

  return <div className={classNames(styles.root, "mt-2")}>

    <OptionalHeader {...doc} />

    <Status statusCode={doc.statusCode} />

    <h5 className="mt-4 mb-4"><Link to={`/docflow/${doc.id}`} className="nav-link">Заявка на ремонт: {doc.title}</Link></h5>

    <p>Автомобиль: {doc.car?.carModel}</p>
    <p>Гос. номер: {doc.car?.stateNumber}</p>
    <p>VIN номер(шасси): {doc.car?.vin} </p>

    {/* <Description {...doc} limit={350} /> */}

    <FileLinkedList files={doc.files} />

    <Author {...doc} />
  </div>
}
