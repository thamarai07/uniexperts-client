import APICaller from "APICaller";

export const getCurrency = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/currency", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
