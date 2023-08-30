import APICaller from "APICaller";

export const getPrograms = (data = {}) =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/program/search", method: "POST", data })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getProgramsV2 = params =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/program/by/country-and-discipline",
			method: "GET",
			params,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getSchoolPrograms = schoolId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/program/school/${schoolId}`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getProgramDetails = programId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/program/${programId}`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getSimilarPrograms = programId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/program/${programId}/similar`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const checkStudentEligibility = params =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/program/${params?.programId}/eligibility`,
			method: "GET",
			params,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
