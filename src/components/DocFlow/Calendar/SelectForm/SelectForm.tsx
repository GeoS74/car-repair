import { useState }from "react"
import styles from "./styles.module.css"

import SelectMonths from "./SelectMonths/SelectMonths"
import SelectYear from "./SelectYear/SelectYear"

type SelectForm = {
    month: number
    setMonth: React.Dispatch<React.SetStateAction<number>>,
    year: number
    setYear: React.Dispatch<React.SetStateAction<number>>,
    showSelectForm: boolean,
    setShowSelectForm: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function SelectForm({month, setMonth, year, setYear, showSelectForm, setShowSelectForm}: SelectForm) {
    const [showMonthForm, setShowMonthForm] = useState(true)
    return (
        <div className={styles.root}>
            {showMonthForm 
            ? <SelectMonths 
                month={month} 
                setMonth={setMonth} 
                year={year} 
                setYear={setYear} 
                showSelectForm={showSelectForm} 
                setShowSelectForm={setShowSelectForm}
                showMonthForm={showMonthForm}
                setShowMonthForm={setShowMonthForm} />
            : <SelectYear year={year} setYear={setYear} showMonthForm={showMonthForm} setShowMonthForm={setShowMonthForm}/>
            }
            
        </div >
    )
}