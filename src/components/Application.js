import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  let dailyAppointments = [];
  
  const setDay = (day) => setState({ ...state, day });

  const appointments = getAppointmentsForDay(state, state.day)

  

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
    ]) 
    .then(all => {
      console.log(all[0]);
      console.log(all[1]); 
    
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data}));
      dailyAppointments = getAppointmentsForDay(state, state.day)
    })
    .catch((err) => console.log(err.message));
}, [state.day])

const dailyApts = appointments.map((appointment) => {
  return (
  <Appointment
    key={appointment.id}
    {...appointment}
  />
  );
});

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
      {dailyApts}
        <Appointment
          key="last"
          time="5pm"
        />
       
       
      </section>
    </main>
  );
}