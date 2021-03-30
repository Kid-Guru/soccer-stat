export const getCompetitions = (state) => {
  return state.app.competitions.map(c => ({ id: c.id, title: c.name, subtitle: c.area.name }))
}

export const getTeams = (state) => {
  return state.app.teams.map(t => ({ id: t.id, title: t.name, subtitle: t.area.name }))
}

export const getTeamCalendarStatus = (state) => state.app.teamCalendar.status
export const getTeamCalendarList = (state) => state.app.teamCalendar.list
export const currentTeam = (state) => {
  const { currentTeamId } = state.app.teamCalendar
  return state.app.teams.find(t => t.id == currentTeamId)
}

export const getCompetitionCalendarStatus = (state) => state.app.competitionCalendar.status
export const getCompetitionCalendarList = (state) => state.app.competitionCalendar.list
export const currentCompetition = (state) => {
  const { currentCompetitionId } = state.app.competitionCalendar
  return state.app.competitions.find(c => c.id == currentCompetitionId)
}