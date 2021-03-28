export const getDateTimeInLocal = (dateUTC) => {
  const d = new Date(dateUTC);
  return { date: d.toLocaleDateString(), time: d.toLocaleTimeString()}
}

export const getScoreMatch = (match) => {
  if (match.score.penalties.homeTeam !== null) {
    return match.score.penalties
  }
  if (match.score.extraTime.homeTeam !== null) {
    return match.score.extraTime
  }
  if (match.score.fullTime.homeTeam !== null) {
    return match.score.fullTime
  }
  if (match.score.halfTime.homeTeam !== null) {
    return match.score.halfTime
  }
  return ({homeTeam: '--', awayTeam: '--'})
}