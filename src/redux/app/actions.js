import { INITIALIZING_APP_SUCCESS, SET_COMPETITIONS, SET_TEAMS, SET_TEAM_CALENDAR, CLEAN_TEAM_CALENDAR, SET_COMPETITION_CALENDAR, CLEAN_COMPETITION_CALENDAR } from './types';
import { getCompetitions, getTeams, requestTeamCalendar, requestTeamCalendarByPeriod, requestCompetitionsCalendarByPeriod } from '../../api/api.js';
import { getDateTimeInLocal, getScoreMatch } from '../../helpers/helpers.js';
import pick from 'lodash/pick';

const initializedSuccess = () => ({ type: INITIALIZING_APP_SUCCESS })
const setCompetitions = (competitions) => ({ type: SET_COMPETITIONS, payload: { competitions } })
const setTeams = (teams) => ({ type: SET_TEAMS, payload: { teams } })

export const initializingApp = () => (dispatch) => {
	Promise.all([getCompetitions(), getTeams()])
		.then(([competitionsData, teamsData]) => {
			console.log(competitionsData, teamsData)
			const processedCompetitionsArray = competitionsData.competitions
				.filter(c => c.plan === 'TIER_ONE')
				.map(c => pick(c, ['id', 'name', 'area', 'numberOfAvailableSeasons', 'code', 'emblemUrl']))
			const processedTeamsArray = teamsData.teams
				.map(c => pick(c, ['id', 'name', 'shortName', 'area', 'crestUrl', 'website', 'email', 'founded', 'clubColors']))
			console.log(processedCompetitionsArray, processedTeamsArray)
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
		rival: id == m.awayTeam.id ? m.homeTeam : m.awayTeam,
		score: getScoreMatch(m),
		winner: m.winner === 'HOME_TEAM' ? m.homeTeam : m.awayTeam,
	}))

	const currentTeamId = id
	dispatch(setTeamCalendar(processedTeamCalendar, currentTeamId))
}

const setCompetitionCalendar = (matches, currentCompetitionId) => ({ type: SET_COMPETITION_CALENDAR, payload: { matches, currentCompetitionId } })
export const cleanCompetitionCalendar = () => ({ type: CLEAN_COMPETITION_CALENDAR })

export const getCompetitionCalendar = (id, dateFrom, dateTo) => async (dispatch) => {
	let competitionCalendar = await requestCompetitionsCalendarByPeriod(id, dateFrom, dateTo)

	const processedCompetitionCalendar = competitionCalendar.matches
		.map(m => pick(m, ['id', 'homeTeam', 'awayTeam', 'score', 'status', 'utcDate']))
		.map(m => ({ ...m, ...getDateTimeInLocal(m.utcDate), score: getScoreMatch(m) }))
	
	const currentCompetitionId = id
	dispatch(setCompetitionCalendar(processedCompetitionCalendar, currentCompetitionId))
}