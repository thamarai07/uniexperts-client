import APICaller from "APICaller";

export const getExamTypes = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/test-score/exam-type", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getExamFields = examType =>
	new Promise((resolve, reject) => {
		APICaller({ 
			url: `/test-score/fields`, 
			method: "GET", 
			params: {examType},
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
