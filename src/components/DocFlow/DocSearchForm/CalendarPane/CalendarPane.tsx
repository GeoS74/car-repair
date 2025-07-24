import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
import { ReactComponent as Icon } from "./image/calendar3.svg";
import { date } from "../../../../libs/formatter";

import classNames from "classnames";
import styles from "./styles.module.css"

export default function CalendarPane() {
  const [value, onChange] = useState<Value>();
  const [showWidget, setShowWidget] = useState(false);

  return <div className={classNames(styles.root)}>

    Период:
    {value ? <span>{formatPeriod(value)}</span> : <></>}
    <Icon width="25" height="25" onClick={() => setShowWidget(true)} />

    {showWidget ? <div className={styles.widget}>
      <Calendar
        onChange={(e) => {
          onChange(e);
          setShowWidget(false)
        }}
        value={value}
        selectRange={true}
      />
    </div>
      : <></>}
    <input type="hidden" name="calendar" defaultValue={formatForQuery(value)} />
  </div>
}

function formatPeriod(val?: Value) {
  if (!val) return '';

  if (Array.isArray(val) && val[0] instanceof Date && val[1] instanceof Date) {
    return `с ${date(val[0].toString())} по ${date(val[1].toString())}`
  }

  return '';
}

function formatForQuery(date?: Value) {
  if (!date) return '';
  if (Array.isArray(date)) {
    return `${format(date[0])}_${format(date[1])}`
  }
  return format(date);
}

function format(date: ValuePiece) {
  if (!date) {
    return '';
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}