import React, { useState } from "react";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';

export function DatePicker() {
  const [date, setDate] = useState(new Date())

  const onChange = (date) => {
    setDate(date)
  }

  return (
    <>
      <Calendar onChange={onChange} value={date} />
    </>
  );
};

