import styles from "./styles.module.css"
import {ReactComponent as IconBackArrow} from "./backArrow.svg"
import { useNavigate } from "react-router-dom"

export default function BackArrow() {
    const navigate = useNavigate();
    return (
        <div className={styles.root} onClick={() => navigate("/newsLine")}>
            <IconBackArrow  height="30px" width="30px" className={styles.rootButton}/>
        </div>
        
        
)}