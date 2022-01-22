
export function getAppointmentsForDay(state, day) {
  
  const foundIt = state.days.find((days) => days.name === day);


  if (state.days.length === 0 || foundIt === undefined) {
    return [];
  }

  return foundIt.appointments.map((id) => state.appointments[id]);
}









export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
}








export function getInterviewersForDay(state, day) {
  const interviewers = [];
  const objInterview = Object.values(interviewers)
  const foundIt = state.days.find((days) => days.name === day);

  if (state.days.length === 0 || foundIt === undefined) {
    return [];
  }
  return foundIt.objInterview.map((id) => state.interviewers[id]);
}