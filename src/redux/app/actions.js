import { INITIALIZING_APP_SUCCESS, SET_COMPETITIONS, SET_TEAMS, SET_TEAM_CALENDAR, CLEAN_TEAM_CALENDAR } from './types';
import { getCompetitions, getTeams, requestTeamCalendar } from '../../api/api.js';
import { getDateTimeInLocal, getScoreMatch } from '../../helpers/helpers.js';
import pick from 'lodash/pick';

const initializedSuccess = () => ({ type: INITIALIZING_APP_SUCCESS })
const setCompetitions = (competitions) => ({ type: SET_COMPETITIONS, payload: { competitions } })
const setTeams = (teams) => ({ type: SET_TEAMS, payload: { teams } })

export const initializingApp = () => (dispatch) => {
	Promise.all([getCompetitions(), getTeams()])
		.then(([competitionsData, teamsData]) => {
			const processedCompetitionsArray = competitionsData.competitions
				.filter(c => c.plan === 'TIER_ONE')
				.map(c => pick(c, ['id', 'name', 'area']))

			const processedTeamsArray = teamsData.teams
				.map(c => pick(c, ['id', 'name', 'shortName', 'numberOfAvailableSeasons', 'code', 'area']))

			dispatch(setCompetitions(processedCompetitionsArray))
			dispatch(setTeams(processedTeamsArray))
		})
		.then(() => {
			dispatch(initializedSuccess())
		})
}

const setTeamCalendar = (matches) => ({ type: SET_TEAM_CALENDAR, payload: {matches}})
export const cleanTeamCalendar = () => ({ type: CLEAN_TEAM_CALENDAR })

export const getTeamCalendar = (id, dateFrom, dateTo) => async (dispatch) => {
	if (dateFrom === undefined && dateTo === undefined) {
		const teamCalendar = await requestTeamCalendar(id)
		console.log(teamCalendar)
		const processedTeamCalendar = teamCalendar.matches.map(m => ({
			id: m.id,
			...getDateTimeInLocal(m.utcDate),
			competition: { id: m.competition.id, name: m.competition.name },
			rival: id === m.awayTeam.id ? m.awayTeam : m.homeTeam,
			score: getScoreMatch(m),
			winner: m.winner === 'HOME_TEAM' ? m.homeTeam : m.awayTeam,
		}))
		const currentTeam = teamCalendar.matches.length === 0
			? null : id === teamCalendar.matches[0].awayTeam.id
				? teamCalendar.matches[0].awayTeam : teamCalendar.matches[0].homeTeam
			dispatch(setTeamCalendar(processedTeamCalendar, currentTeam))
	}
}
