/* eslint-disable no-unused-vars */
import APICaller from "APICaller";

export const uploadAgentDocuments = data =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/agent/documents", method: "PATCH", data })
			.then(({ token, ...restDetails }) => {
				resolve(restDetails);
			})
			.catch(error => {
				reject(error);
			});
	});

export const acceptTnC = data =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/agent/accept-tnc", method: "POST", data })
			.then(({ token, ...restDetails }) => {
				resolve(restDetails);
			})
			.catch(error => {
				reject(error);
			});
	});

export const getAgentBankingInformation = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/agent/bank-information", method: "GET" })
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});

export const setAgentBankingInformation = values =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/agent/bank-information",
			method: "PATCH",
			data: { ...values },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getAccountManager = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/agent/account-manager", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getAgentGeneralInfo = () =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/agent/general-information",
			method: "GET",
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const setAgentGeneralInfo = values =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/agent/general-information",
			method: "PATCH",
			data: { ...values },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getAgentDocuments = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/agent/documents", method: "GET" })
			.then(res => resolve(res))
			.catch(err => reject(err));
	});

export const uploadDocument = ({ documentID, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/agent/document/${documentID}`,
			method: "PATCH",
			data: data,
		})
			.then(res => resolve(res))
			.catch(err => reject(err));
	});
