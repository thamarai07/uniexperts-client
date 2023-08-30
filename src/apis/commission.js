import APICaller from "APICaller";

export const getCommissions = params =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/commission", method: "GET", params })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getSchoolCommissions = params =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/commission/type", method: "GET", params })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
