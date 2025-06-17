import styles from "./styles.module.css"

import DayComponent from "../DayComponent/DayComponent";
import FooterForm from "./FooterForm/FooterForm";
import HeaderForm from "./HeaderForm/HeaderForm";

type TypeCalendarForm = {
    hiddenCalendar: boolean,
    setHiddenCalendar: React.Dispatch<React.SetStateAction<boolean>>,
    date: number,
    setDate: React.Dispatch<React.SetStateAction<number>>,
    month: number,
    setMonth: React.Dispatch<React.SetStateAction<number>>,
    year: number,
    setYear: React.Dispatch<React.SetStateAction<number>>,
    showSelectForm: boolean,
    setShowSelectForm: React.Dispatch<React.SetStateAction<boolean>>,
}


export default function CalendarForm({hiddenCalendar, setHiddenCalendar, date, setDate, month, setMonth, year, setYear, showSelectForm, setShowSelectForm}: TypeCalendarForm) {

    return (
        <div className={styles.root}>
            <HeaderForm 
                month={month} 
                setMonth={setMonth}
                year={year}
                setYear={setYear}
                showSelectForm={showSelectForm}
                setShowSelectForm={setShowSelectForm}/>
            <DayComponent />
            <FooterForm 
                date={date}
                setDate={setDate} 
                month={month}
                setMonth={setMonth}
                year={year}
                hiddenCalendar={hiddenCalendar}
                setHiddenCalendar={setHiddenCalendar}/>
        </div>
    )
}