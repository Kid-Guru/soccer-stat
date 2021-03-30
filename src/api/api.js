import * as axios from "axios";

const instanceAxios = axios.create({
  baseURL: 'https://api.football-data.org/v2/',
  headers: {
    "X-Auth-Token": "42423c99d523409aae62e30867c8bcdc"
  }
})

export const getCompetitions = () => {
  return instanceAxios.get(`competitions/`)
    .then(response => {
      return response.data;
    });
}

export const getTeams = () => {
  return instanceAxios.get(`teams/`)
    .then(response => {
      return response.data;
    });
}

export const requestTeamCalendar = (id) => {
  return instanceAxios.get(`teams/${id}/matches`)
    .then(response => {
      return response.data;
    });
}

export const requestTeamCalendarByPeriod = (id, dateFrom, dateTo) => {
  return instanceAxios.get(`teams/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`)
    .then(response => {
      return response.data;
    });
}

export const requestCompetitionsCalendarByPeriod = (id, dateFrom, dateTo) => {
  return instanceAxios.get(`competitions/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`)
    .then(response => {
      return response.data;
    });
}
