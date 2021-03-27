import { INITIALIZING_APP_SUCCESS, SET_COMPETITIONS, SET_TEAMS } from './types';

let initialState = {
	initialized: false,
	competitions: [],
	teams: [],
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
};

export const appReducer = (state = initialState, action) => {
	if (handlers[action.type]) {
		return handlers[action.type](state, action);
	}
	return state
}


