import { INITIALIZING_APP_SUCCESS, SET_COMPETITIONS, SET_TEAMS, SET_TEAM_CALENDAR, CLEAN_TEAM_CALENDAR } from './types';
import { getCompetitions, getTeams, requestTeamCalendar, requestTeamCalendarByPeriod } from '../../api/api.js';
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
				.map(c => pick(c, ['id', 'name', 'area', 'numberOfAvailableSeasons', 'code']))
			const processedTeamsArray = teamsData.teams
				.map(c => pick(c, ['id', 'name', 'shortName', 'area', 'crestUrl', 'website']))

			dispatch(setCompetitions(processedCompetitionsArray))
			dispatch(setTeams(processedTeamsArray))
		})
		.then(() => {
			dispatch(initializedSuccess())
		})
}

const setTeamCalendar = (matches, currentTeamId) => ({ type: SET_TEAM_CALENDAR, payload: { matches, currentTeamId } })
export const cleanTeamCalendar = () => ({ type: CLEAN_TEAM_CALENDAR })

export const getTeamCalendar = (id, dateFrom, dateTo) => async (dispatch) => {
	let teamCalendar
	if (dateFrom === undefined && dateTo === undefined) {
		teamCalendar = await requestTeamCalendar(id)
	} else {
		teamCalendar = await requestTeamCalendarByPeriod(id, dateFrom, dateTo)
	}
	const processedTeamCalendar = teamCalendar.matches.map(m => ({
		id: m.id,
		...getDateTimeInLocal(m.utcDate),
		competition: { id: m.competition.id, name: m.competition.name },
		rival: id === m.awayTeam.id ? m.awayTeam : m.homeTeam,
		score: getScoreMatch(m),
		winner: m.winner === 'HOME_TEAM' ? m.homeTeam : m.awayTeam,
	}))
	// const currentTeamId = teamCalendar.matches.length === 0
	// 	? null : id === teamCalendar.matches[0].awayTeam.id
	// 		? teamCalendar.matches[0].awayTeam : teamCalendar.matches[0].homeTeam
	const currentTeamId = id
	dispatch(setTeamCalendar(processedTeamCalendar, currentTeamId))
}
