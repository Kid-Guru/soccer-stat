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

export const getLastMonthPeriod = () => {
  const d = new Date()
  const dateTo = d.toLocaleDateString('ru-RU')

  d.setMonth(d.getMonth() - 1)
  const dateFrom = d.toLocaleDateString('ru-RU')

  return({dateTo: dateTo.split('.').reverse().join('-'), dateFrom: dateFrom.split('.').reverse().join('-')})
}