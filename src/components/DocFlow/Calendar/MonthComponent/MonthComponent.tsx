import styles from "./styles.module.css";

const listMonth = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export default function MonthComponent(
  {month, setMonth, year, setYear, typeEvent}: 
  {month: number, 
   setMonth: React.Dispatch<React.SetStateAction<number>>,
   year: number,
   setYear: React.Dispatch<React.SetStateAction<number>>
   typeEvent: string}) {

    if (typeEvent === "icon") {
      switch(month) {
        case 0:
          return <div className={styles.root}>{`0${month + 1}`}</div>
        case 1:
          return <div className={styles.root}>{`0${month + 1}`}</div>
        case 2:
          return <div className={styles.root}>{`0${month + 1}`}</div>
        case 3:
          return <div className={styles.root}>{`0${month + 1}`}</div>
        case 4:
          return <div className={styles.root}>{`0${month + 1}`}</div>
        case 5:
          return <div className={styles.root}>{`0${month + 1}`}</div>
        case 6:
          return <div className={styles.root}>{`0${month + 1}`}</div>
        case 7:
          return <div className={styles.root}>{`0${month + 1}`}</div>
        case 8:
          return <div className={styles.root}>{`0${month + 1}`}</div>
        case 9:
          return <div className={styles.root}>{`0${month + 1}`}</div>
        case 10:
          return <div className={styles.root}>{`${month + 1}`}</div>
        case 11:
          return <div className={styles.root}>{`${month + 1}`}</div>
        default:
          return <div className={styles.root}>{`${month + 1}`}</div>
      }
    } else {
      if (month < 0) {
        setMonth(11);
        setYear(year - 1);
        return <>{listMonth[month]}</>
      } else if (month > 11) {
        setMonth(0);
        setYear(year + 1);
        return <>{listMonth[month]}</>
      }
      return <>{listMonth[month]}</>
    }

  
}