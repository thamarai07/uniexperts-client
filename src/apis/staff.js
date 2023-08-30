import APICaller from "APICaller";

export const getStaff = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/staff", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addStaff = data =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/staff",
			method: "POST",
			data,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const generalStaffDetail = () =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/staff/me/details",
			method: "GET",
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const setNotificationsPreference = values =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/staff/me/notifications",
			method: "PATCH",
			data: { ...values },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const changeStaffActiveStatus = (staffID, values) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/staff/${staffID}/active-status`,
			method: "PATCH",
			data: { ...values },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const updateUserDP = dp =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/staff/me/dp",
			method: "PATCH",
			data: { dp },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const updateStaff = ({ staffId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/staff/${staffId}`,
			method: "POST",
			data,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
