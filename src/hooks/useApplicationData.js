import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState(prev => ({...prev, day }));

  
  const usedVacancies = function () {
   return Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        console.log("all", all);

        setState(prev => ({...prev, days, appointments, interviewers}));
      });
  };

  useEffect(() => {
    usedVacancies();
  }, []);

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const apiURL = `/api/appointments/${id}`;
    return axios.put(apiURL, { interview })
      .then(() => {
        setState({ ...state, appointments });
      })
      .then(() => { return usedVacancies(); })
      
  }

  // deleting interviews
  function cancelInterview (id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const apiURL = `/api/appointments/${id}`;
    return axios.delete(apiURL, { interview })
      .then(() => {
        setState({ ...state, appointment });
      })
      .then(() => { return usedVacancies(); })
      
  }
  return { state, setDay, bookInterview, cancelInterview };
}
export default useApplicationData;