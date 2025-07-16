import React from 'react'

import { WeekHeader } from './WeekHeader';
import { DatePicker } from './DatePicker';
import './ServiceSlotsPage.css'

export function ServiceSlotsPage() {

  return (
    <div className='slot-page-container'>
      {/* <div className="title">
        <h1>Select an appointment time</h1>
        <h2>MTN Molyko</h2>
        <h3>Sim card registrations</h3>
      </div>
       */}
       <div className="calendar">
        <DatePicker />
       </div>
       
      <WeekHeader />
    </div>
  );
}