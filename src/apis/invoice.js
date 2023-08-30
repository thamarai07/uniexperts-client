import APICaller from "APICaller";

export const getInvoices = params =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/invoice", method: "GET", params })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
