import React from "react";
import { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  isToday,
} from "date-fns";
import { ServiceSlots } from "../serviceSlots/ServiceSlots";
import "./WeekHeader.css";

export function WeekHeader() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    const days = [];
    for (let i = 1; i < 6; i++) {
      const date = addDays(currentWeekStart, i);
      days.push({
        day: format(date, "EEE"),
        date: format(date, "d"),
        fullDate: date,
      });
    }
    setWeekDates(days);
  }, [currentWeekStart]);

  const goToNextWeek = () => setCurrentWeekStart((prev) => addWeeks(prev, 1));
  const goToPreviousWeek = () =>
    setCurrentWeekStart((prev) => subWeeks(prev, 1));

  return (
    <div className="week-header-container">
      <div className="week-header-controls">
        <button onClick={goToPreviousWeek} className="nav-button">
          ← Previous
        </button>
        <h2 className="month-title">{format(currentWeekStart, "MMMM yyyy")}</h2>
        <button onClick={goToNextWeek} className="nav-button">
          Next →
        </button>
      </div>

      <div className="week-grid">
        {weekDates.map((d, i) => (
          <div
            key={i}
            className={`week-day ${isToday(d.fullDate) ? "today" : ""}`}
          >
            <div className="date-name">
              <div className="day-name">{d.day}</div>
              <div className="day-date">{d.date}</div>
            </div>
            <div className="div">
              <ServiceSlots />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
