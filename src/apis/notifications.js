import APICaller from "APICaller";

export const getNotifications = params =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/notification",
			method: "GET",
			params,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const notificationRead = id =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/notification/${id}/dismiss`,
			method: "GET",
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
