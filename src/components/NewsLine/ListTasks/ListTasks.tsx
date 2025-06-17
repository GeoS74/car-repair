import { useLocation} from "react-router-dom"
// import { Converter } from "md-conv";
import styles from "./styles.module.css"
import BackArrow from "../../DocFlow/BackArrow/BackArrow";
import DocRow from "../NewsRow/NewsRow";

// const converter = new Converter()
// const docsLimit = 25;


export default function ListTasks (){
    const docs = useLocation().state.ListTasks as INews[];
    return (
    <div className={styles.root}>
        <div className={styles.backArrow}>
            <BackArrow />
            <small>Назад</small> 
        </div>

        {docs?.map(news => <DocRow key={news.id} {...news} />)}
    </div>
)}