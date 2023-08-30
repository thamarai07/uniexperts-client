import APICaller from "APICaller";

export const getCountries = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/geography/countries", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getTimezone = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/geography/timezones", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getPincodeData = pincode =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/geography/pincode/${pincode}`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getStates = countryCode =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/geography/states/${countryCode}`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
