import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appStore/reducers";
import { USER_LOGOUT } from "./appStore/types";
import { userReducer } from "./userDetails/reducers";

const applicationReducer = combineReducers({
	user: userReducer,
	app: appReducer,
});

const rootReducer = (state, action) => {
	if (action.type === USER_LOGOUT) {
		sessionStorage.clear();
		return applicationReducer(undefined, action);
	}

	return applicationReducer(state, action);
};

export const store = configureStore({
	reducer: rootReducer,
});
