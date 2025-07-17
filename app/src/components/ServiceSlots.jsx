import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import './ServiceSlots.css'; 
import { useParams } from 'react-router';
import Modal from './Modal';

export function ServiceSlots() {

const {serviceId} = useParams

  // fetch slots from the backend
    const [slots, setSlots] = useState([]);
  
    useEffect(() => {
      axios
        .get(
          `http://localhost:8085/api/v1/service/${serviceId}/slots`
        )
        .then((response) => {
          setSlots(response.data.slots);
        });
    }, [serviceId]);
    
  
    // helper function to convert microseconds to readable time
    const formatTime = (microseconds) => {
    const ms = microseconds / 1000;
    const date = new Date(ms);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="slots-container">
      <p>hello </p>
        {slots.map((slot) => {
          return (
            <div key={slot.id} className="slot-button">
              <button type="button" onClick={Modal}>
                Open bbbbbbbbbb modal
              </button>

              <button>{formatTime(slot.start_time.Microseconds)}</button>
            </div>
          );
        })}
        
      </div>
  );
}