export const getCompetitions = (state) => {
  return state.app.competitions.map(c => ({id: c.id, title: c.name, subtitle: c.area.name}))
}

export const getTeams = (state) => {
  console.log(state)
  return state.app.teams.map(t => ({id: t.id, title: t.name, subtitle: t.area.name}))
}

