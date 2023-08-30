import { SET_COUNTRIES, SET_LOADER, SET_TIMEZONE, USER_LOGOUT } from "./types";

export const userLogout = () => ({
	type: USER_LOGOUT,
});

export const setLoader = isLoading => ({
	type: SET_LOADER,
	payload: isLoading,
});

export const setCountries = countries => ({
	type: SET_COUNTRIES,
	payload: countries,
});

export const setTimezone = timezone => ({
	type: SET_TIMEZONE,
	payload: timezone,
});
