import { useState } from "react"

import styles from "./styles.module.css"
import { ReactComponent as IconCalendar } from "./img/calendar.svg"
import YearComponent from "./YearComponent/YearComponent";
import MonthComponent from "./MonthComponent/MonthComponent";
import DateComponent from "./DateComponent/DateComponent";
import CalendarForm from "./CalendarForm/CalendarForm";
import SelectForm from "./SelectForm/SelectForm";
import classNames from "classnames";

type Props = {
  stylesCalendar: string
  deadLine?: string
}

export default function Calendar({ stylesCalendar, deadLine }: Props) {
  const newDate = new Date(deadLine || Date.now());
  const [date, setDate] = useState(newDate.getDate());
  const [month, setMonth] = useState(newDate.getMonth());
  const [year, setYear] = useState(newDate.getFullYear());


  // Отображать иконку календаря или форму календаря
  const [hiddenCalendar, setHiddenCalendar] = useState(true)
  // Отображает форму выбора года и месяца
  const [showSelectForm, setShowSelectForm] = useState(true)

  return (
    <div className={classNames(styles.root)} data-calendartheme={stylesCalendar}>
      <p>Дата выполнения</p>
      {showSelectForm
        ? hiddenCalendar
          ? <div className={styles.icon} onClick={() => setHiddenCalendar(!hiddenCalendar)}>
            <IconCalendar className={styles.svg} />
            <div className={styles.date}>
              <DateComponent date={date} />.
              <MonthComponent month={month} setMonth={setMonth} year={year} setYear={setYear} typeEvent={"icon"} />.
              <YearComponent year={year} />
            </div>
          </div>
          : <CalendarForm
            hiddenCalendar={hiddenCalendar}
            setHiddenCalendar={setHiddenCalendar}
            date={date}
            setDate={setDate}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            showSelectForm={showSelectForm}
            setShowSelectForm={setShowSelectForm}
          />
        : <SelectForm month={month} setMonth={setMonth} year={year} setYear={setYear} showSelectForm={showSelectForm} setShowSelectForm={setShowSelectForm} />}
      <input
        required={true}
        type="hidden"
        defaultValue={(new Date(year, month, date)).toString()}
        name="deadLine" />
    </div >
  )
}