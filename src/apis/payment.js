import APICaller from "APICaller";

export const getAccountSummary = currency =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/payment/account-summary",
			method: "GET",
			params: { currency },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getPaymentTransactions = params =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/payment/transactions", method: "GET", params })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getCurrencies = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/currency", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const verifyOTP = ({ otp, transactionId }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/payment/verify-otp/${transactionId}`,
			method: "POST",
			data: { otp },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const withdrawAmount = data =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/payment/withdraw", method: "POST", data })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
