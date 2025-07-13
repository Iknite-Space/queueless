import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import './ServiceSlots.css'; 

export function ServiceSlots() {
  // fetch slots from the backend
    const [slots, setSlots] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:8085/api/v1/service/9f641718-e1fa-4177-b227-5e397805a443/slots')
        .then((response) => {
          setSlots(response.data.slots)
        });
    }, []);
    
  
    // helper function to convert microseconds to readable time
    const formatTime = (microseconds) => {
    const ms = microseconds / 1000;
    const date = new Date(ms);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="slots-container">
        {slots.map((slot) => {
          return (
            <div key={slot.id} className="slot-button">
            <button >{formatTime(slot.start_time.Microseconds)}</button>
            </div>
          );
        })}
        
      </div>
  );
}