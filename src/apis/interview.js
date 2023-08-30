import APICaller from "APICaller";

export const getInterviewPartner = params =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/interview/partner`,
			method: "GET",
			params,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const scheduleMeeting = data =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/interview/support", method: "POST", data })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
