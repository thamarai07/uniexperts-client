import { CLEAR_USER, SET_USER } from "./types";

const initialState = {};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USER:
			return {
				...payload,
			};

		case CLEAR_USER:
			return initialState;

		default:
			return state;
	}
};
