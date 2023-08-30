import APICaller from "APICaller";

export const getIntakes = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/intake", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
