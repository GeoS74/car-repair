import classNames from "classnames"
import styles from "./styles.module.css"

type SelectForm = {
    month: number
    setMonth: React.Dispatch<React.SetStateAction<number>>,
    year: number
    setYear: React.Dispatch<React.SetStateAction<number>>,
    showSelectForm: boolean,
    setShowSelectForm: React.Dispatch<React.SetStateAction<boolean>>,
    showMonthForm: boolean,
    setShowMonthForm: React.Dispatch<React.SetStateAction<boolean>>,
}

const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]

export default function SelectMonths({setMonth, year, showSelectForm, setShowSelectForm, showMonthForm, setShowMonthForm}: SelectForm) {    
    return (
        <div className={styles.root}>
            <div className={styles.year} onClick={() => setShowMonthForm(!showMonthForm)}>{year}</div>
            <div className={styles.months}>
                {months.map((value, index) => <div 
                                                key={index} 
                                                className={classNames(styles.month, _currentMonth(index, year) ? styles.currentMonth : null)} 
                                                onClick={() => {setShowSelectForm(!showSelectForm); setMonth(index)}}>
                                                    {value}
                                              </div>)}
            </div>            
        </div>
    )
}

function _currentMonth(index: number, year: number) {    
    const newDate = new Date();
    if (year === newDate.getFullYear() && index === newDate.getMonth()) {
        return true
    }
    return false
}