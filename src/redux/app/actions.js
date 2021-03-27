import { INITIALIZING_APP_SUCCESS, SET_COMPETITIONS, SET_TEAMS } from './types';
import { getCompetitions, getTeams } from '../../api/api.js';
import pick from 'lodash/pick';

const initializedSuccess = () => ({ type: INITIALIZING_APP_SUCCESS })
const setCompetitions = (competitions) => ({ type: SET_COMPETITIONS, payload: { competitions }})
const setTeams = (teams) => ({ type: SET_TEAMS, payload: { teams }})

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
