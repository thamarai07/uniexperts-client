import APICaller from "APICaller";

export const getSchools = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/school", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getSchoolDetails = schoolId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/school/${schoolId}`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
