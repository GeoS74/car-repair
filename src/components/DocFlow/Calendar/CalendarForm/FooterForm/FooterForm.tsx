import styles from "./styles.module.css"
import classNames from "classnames"

type TypeCalendarForm = {  
    date: number  
    setDate: React.Dispatch<React.SetStateAction<number>>,
    month: number,
    setMonth: React.Dispatch<React.SetStateAction<number>>,
    year: number,
    hiddenCalendar: boolean
    setHiddenCalendar: React.Dispatch<React.SetStateAction<boolean>>
}

type TypeObjectDate = {
    value: number,
    style: boolean
}

export default function FooterForm({date, setDate, month, setMonth, year, hiddenCalendar, setHiddenCalendar}: TypeCalendarForm) {
    // дней в предыдущем месяце
    const lastData = new Date(year, month, 0).getDate()
    // дней в нынешнем месяце
    const newData = new Date(year, month + 1, 0).getDate()
    // с какого дня недели начинается нынешний месяц
    const newDay = new Date(year, month, 0).getDay()
    const arraydate = [] as TypeObjectDate[]

    const newDate = new Date();

    
    // Заполняем массив днями из предыдущего месяца если нынешней начинается не с понедельника
    for (let i = lastData - newDay + 1; i <= lastData; i++) {
        const tempObject = {
            value: i,
            style: false
        }        
        tempObject.value = i
        arraydate.push(tempObject)
    }
    // заполняем нынешний месяц
    for (let i = 1; i <= newData; i++) {
        const tempObject = {
            value: i,
            style: true
        }        
        tempObject.value = i
        arraydate.push(tempObject)
    }   
    // если остались дни до воскресенья, заполняются днями из следующего месяца
    if (arraydate.length < 35) {
        const stepDey = 36 - arraydate.length
        for (let i = 1; i < stepDey; i++) {
            const tempObject = {
                value: i,
                style: false
            }            
            tempObject.value = i
            arraydate.push(tempObject)
        }
    }
    // если числа перешагнули на следующую строчку то заполняется еще одна строчка до конца
    if (arraydate.length > 35) {
        const stepDey = 43 - arraydate.length
        for (let i = 1; i < stepDey; i++) {
            const tempObject = {
                value: i,
                style: false
            }            
            tempObject.value = i
            arraydate.push(tempObject)
        }
    }

    return (
        <div className={styles.root}>
            {arraydate.map((value, index) => (
                <div 
                    key={index} 
                    className={classNames(styles.date, value.style ? getTodayDate(value.value, date, month, year, newDate) ? styles.dateNew : styles.month : "", )}
                    onClick={(e) => _clickDate(e, setDate, month, setMonth, hiddenCalendar, setHiddenCalendar)}>
                        {value.value}
                </div>
            ))}
        </div>
    )
}
// Выбрать число по клику и записать в основное окно
function _clickDate(e: React.MouseEvent<HTMLDivElement, MouseEvent>,
                    setDate: React.Dispatch<React.SetStateAction<number>>,
                    month: number,
                    setMonth: React.Dispatch<React.SetStateAction<number>>,
                    hiddenCalendar: boolean,
                    setHiddenCalendar: React.Dispatch<React.SetStateAction<boolean>>) {
    // console.log(e.currentTarget.getAttribute('class'))
    const classStr = e.currentTarget.getAttribute('class')
    if (!classStr?.includes('month') && !classStr?.includes('dateNew')) {
        // проверка что выбрали число из следующего месяца или предыдущего
        if (Number(e.currentTarget.textContent) > 20) {
            setMonth(month - 1)
        }
        else if (Number(e.currentTarget.textContent) < 8) {
            setMonth(month + 1)
        }
    }

    if (e.currentTarget.textContent !== null) {
        setDate(Number(e.currentTarget.textContent));
        setHiddenCalendar(!hiddenCalendar);
    }
}
// Выделить сегодняшнюю дату
function getTodayDate(value: number, date: number, month: number, year: number, newDate: Date) {
    if (newDate.getDate() === value && newDate.getMonth() === month && newDate.getFullYear() === year) {
        return true
    }
    return false
}