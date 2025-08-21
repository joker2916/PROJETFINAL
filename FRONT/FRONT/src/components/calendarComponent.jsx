'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const addEvent = () => {
    const newEvent = prompt("Ajouter un événement pour le " + date.toDateString());
    if (newEvent) {
      setEvents([...events, { date: date.toDateString(), text: newEvent }]);
    }
  };

  const deleteEvent = (eventIndex) => {
    const updated = [...events];
    updated.splice(eventIndex, 1);
    setEvents(updated);
  };

  return (
    <div className="calendar-container">
      <h2>Mon Calendrier</h2>
      <div class='calendrier'><Calendar onChange={handleChange} value={date} /></div>

      <button onClick={addEvent} className='calendar_button'>Ajouter un événement</button>
      <h3>Événements pour {date.toDateString()} :</h3>
      <ul>
        {events
          .filter(event => event.date === date.toDateString())
          .map((event, index) => (
            <li key={index}>
              {event.text}
              <button onClick={() => deleteEvent(index)}>Supprimer</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CalendarComponent;