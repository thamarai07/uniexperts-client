import { CLEAR_USER, SET_USER } from "./types";

export const setUser = (details = {}) => ({
	type: SET_USER,
	payload: details,
});

export const clearUser = () => ({
	type: CLEAR_USER,
});
