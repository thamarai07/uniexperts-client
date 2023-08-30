import { SET_COUNTRIES, SET_LOADER, SET_TIMEZONE } from "./types";

const initialState = {
	isLoading: false,
	countries: [],
	timezone: [],
};

export const appReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_LOADER:
			return {
				...state,
				isLoading: payload,
			};

		case SET_COUNTRIES:
			return {
				...state,
				countries: payload,
			};

		case SET_TIMEZONE:
			return {
				...state,
				timezone: payload,
			};

		default:
			return state;
	}
};
