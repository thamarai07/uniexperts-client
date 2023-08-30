import APICaller from "APICaller";

export const getDashboardBanners = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/dashboard/banners", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getDashboardCount = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/dashboard/count", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getTopSchools = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/dashboard/top-schools", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getInterviews = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/dashboard/interviews", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getIntakes = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/dashboard/intake", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
