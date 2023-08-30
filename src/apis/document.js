import APICaller from "APICaller";

export const getPartnerDocumentsList = (country = "india") =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/document-type/partner?country=${country}`,
			method: "GET",
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getStudentDocumentsList = () =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/document-type/student",
			method: "GET",
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
