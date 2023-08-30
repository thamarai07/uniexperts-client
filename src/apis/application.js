import APICaller from "APICaller";

export const getApplications = params =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/application", method: "GET", params })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addApplications = data =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/application", method: "POST", data })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getApplicationDetails = applicationId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/application/${applicationId}`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getApplicationTasks = applicationId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/application/${applicationId}/task`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const updateApplicationTaskData = ({ applicationId, taskId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student/${applicationId}/task/${taskId}`,
			method: "PATCH",
			params: { data },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getApplicationDocuments = applicationId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/application/${applicationId}/document`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getApplicationComments = applicationId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/application/${applicationId}/comment`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addApplicationComments = ({ applicationId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/application/${applicationId}/comment`,
			method: "POST",
			data,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getApplicationPayments = applicationId =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/application/${applicationId}/payment`,
			method: "GET",
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addApplicationPayments = ({ applicationId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/application/${applicationId}/payment`,
			method: "POST",
			data,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
