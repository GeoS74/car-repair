import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

import classNames from "classnames";
import styles from "./styles.module.css";

export default function CalendarWrap() {
  const [value, onChange] = useState<Value>([new Date(), new Date()]);

  return <div className={classNames(styles.root)}>
    <Calendar
      onChange={onChange}
      value={value}
      selectRange={true}
    />
    <input type="hidden" name="calendar" defaultValue={dateFormat(value)} />
  </div>;
}

function dateFormat(date: Value){
  if(Array.isArray(date)) {
    return `${format(date[0])}_${format(date[1])}`
  }
  return format(date);
}

function format(date: ValuePiece){
  if(!date) {
    return '';
  }
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}