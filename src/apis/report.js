import APICaller from "APICaller";

export const getTotalEarning = time =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/report/total-earning",
			method: "GET",
			params: { time },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getAgentEarning = time =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/report/agent-earning",
			method: "GET",
			params: { time },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getReportData = () =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/report/data",
			method: "GET",
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getReportList = () =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/report/list",
			method: "GET",
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
