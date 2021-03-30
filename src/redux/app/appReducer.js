import { INITIALIZING_APP_SUCCESS, SET_COMPETITIONS, SET_TEAMS, SET_TEAM_CALENDAR, CLEAN_TEAM_CALENDAR, SET_COMPETITION_CALENDAR, CLEAN_COMPETITION_CALENDAR } from './types';

let initialState = {
	initialized: false,
	competitions: [],
	teams: [],
	teamCalendar: {
		status: 'fetching',
		list: [],
		currentTeamId: null,
	},
	competitionCalendar: {
		status: 'fetching',
		list: [],
		currentCompetitionId: null,
	}
}

const handlers = {
	[INITIALIZING_APP_SUCCESS]: (state, action) => {
		return {
			...state,
			initialized: true,
		}
	},
	[SET_COMPETITIONS]: (state, action) => {
		const { competitions } = action.payload
		return {
			...state,
			competitions,
		}
	},
	[SET_TEAMS]: (state, action) => {
		const { teams } = action.payload
		return {
			...state,
			teams,
		}
	},
	[SET_TEAM_CALENDAR]: (state, action) => {
		const { matches, currentTeamId } = action.payload
		return {
			...state,
			teamCalendar: {
				...state.teamCalendar,
				status: 'received',
				list: [...matches],
				currentTeamId: currentTeamId,
			}
		}
	},
	[CLEAN_TEAM_CALENDAR]: (state, action) => {
		return {
			...state,
			teamCalendar: {
				status: 'fetching',
				list: [],
				currentTeamId: null,
			}
		}
	},
	[SET_COMPETITION_CALENDAR]: (state, action) => {
		const { matches, currentCompetitionId } = action.payload
		return {
			...state,
			competitionCalendar: {
				status: 'received',
				list: [...matches],
				currentCompetitionId: currentCompetitionId,
			}
		}
	},
	[CLEAN_COMPETITION_CALENDAR]: (state, action) => {
		return {
			...state,
			competitionCalendar: {
				status: 'fetching',
				list: [],
				currentCompetitionId: null,
			}
		}
	},
};

export const appReducer = (state = initialState, action) => {
	if (handlers[action.type]) {
		return handlers[action.type](state, action);
	}
	return state
}


