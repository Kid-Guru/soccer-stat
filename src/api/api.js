import * as axios from "axios";
import * as PATH from "./endPoints";
import apiKey from "./apiKey";

const instanceAxios = axios.create({
  baseURL: 'https://api.football-data.org/v2',
  headers: {
    "X-Auth-Token": apiKey,
  }
})

export const getCompetitions = () => {
  return instanceAxios.get(`${PATH.COMPETITIONS}`)
    .then(response => {
      return response.data;
    });
}

export const getTeams = () => {
  return instanceAxios.get(`${PATH.TEAMS}`)
    .then(response => {
      return response.data;
    });
}

export const requestTeamCalendar = (id) => {
  return instanceAxios.get(`${PATH.TEAMS}/${id}${PATH.MATCHES}`)
    .then(response => {
      return response.data;
    });
}

export const requestTeamCalendarByPeriod = (id, dateFrom, dateTo) => {
  return instanceAxios.get(`${PATH.TEAMS}/${id}${PATH.MATCHES}?dateFrom=${dateFrom}&dateTo=${dateTo}`)
    .then(response => {
      return response.data;
    });
}

export const requestCompetitionsCalendarByPeriod = (id, dateFrom, dateTo) => {
  return instanceAxios.get(`${PATH.COMPETITIONS}/${id}${PATH.MATCHES}?dateFrom=${dateFrom}&dateTo=${dateTo}`)
    .then(response => {
      return response.data;
    });
}
