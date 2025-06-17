// import { useState } from "react";

import styles from "./styles.module.css";

const listDay = [
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб",
  "Вс",
];

export default function DayComponent() {
  // const newDate = new Date();
  // const [day, setDay] = useState(newDate.getDay());

  return (
    <div className={styles.root}>
      {listDay.map((value, index) => (
        <div key={index + value}>{value}</div>
      ))}
    </div>
  )
}
