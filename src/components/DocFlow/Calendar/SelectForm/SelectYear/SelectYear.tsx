import classNames from "classnames"
import styles from "./styles.module.css"

import {ReactComponent as LeftArrow} from "../../img/leftArrow.svg"
import {ReactComponent as RightArrow} from "../../img/rightArrow.svg"

type SelectForm = {
    year: number
    setYear: React.Dispatch<React.SetStateAction<number>>,
    showMonthForm: boolean,
    setShowMonthForm: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function SelectYear({year, setYear, showMonthForm, setShowMonthForm}: SelectForm) {
    const listYear = [];
    const startingYear = year - year % 10
    for (let i = startingYear - 1; i < startingYear + 11; i++) {
        listYear.push(i)
    }
    return (
        <div className={styles.root}>            
            <div className={styles.hederMenu}>
                <LeftArrow height="25px" width="25px" className={styles.arrow} onClick={() => setYear(year - 10)}/>
                <p>{`${startingYear} - ${startingYear + 9}`}</p>
                <RightArrow height="25px" width="25px" className={styles.arrow} onClick={() => setYear(year + 10)}/>
            </div>
            <div className={styles.years}>
                {listYear.map((value, index) => <div 
                                                    key={index} 
                                                    className={classNames(styles.year, _currentYear(value) ? styles.currentYear : null)} 
                                                    onClick={() => {setYear(value); setShowMonthForm(!showMonthForm)}}>
                                                        {value}
                                                </div>)}
            </div>            
        </div>
    )
}

function _currentYear(value: number) {
    const newDate = new Date();
    if (value === newDate.getFullYear()) {
        return true
    }
    return false
}