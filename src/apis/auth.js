import APICaller from "APICaller";
import { _setToken } from "utils/token";

export const getBackgroundImage = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/auth/background", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const config = (country = "india") =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/auth/config?country=${country}`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const login = data =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/auth/login", method: "POST", data })
			.then(({ token, ...restDetails }) => {
				_setToken(token);
				resolve(restDetails);
			})
			.catch(error => {
				reject(error);
			});
	});

export const tnc = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/agent/tnc", method: "GET" })
			.then(( data ) => resolve(data))
			.catch(error => reject(error));
	});

export const signup = data =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/auth/signup", method: "POST", data })
			.then(({ token, ...restDetails }) => {
				_setToken(token);
				resolve({ token, ...restDetails });
			})
			.catch(error => {
				reject(error);
			});
	});

export const forgotPassword = data =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/auth/forgot-password", method: "POST", data })
			.then(() => resolve())
			.catch(error => reject(error));
	});

export const verifyOTP = data =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/auth/verify-otp", method: "POST", data })
			.then(() => resolve())
			.catch(error => reject(error));
	});

export const resetPassword = data =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/auth/reset-password", method: "POST", data })
			.then(({ token, details }) => {
				_setToken(token);
				resolve(details);
			})
			.catch(error => {
				reject(error);
			});
	});

export const getProfileData = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/auth/profile", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const verifyEmail = email =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/auth/email-exist", method: "POST", data: { email } })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
