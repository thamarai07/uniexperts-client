import APICaller from "APICaller";

export const getStudents = params =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student`,
			method: "GET",
			// params,
		})
			.then((response) => {
				// console.log(response, 'frpm api call==========');
				resolve(response)
			})
			.catch(error => reject(error));
	});

export const removeStudent = studentId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/student/${studentId}`, method: "DELETE" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addStudent = data =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/student", method: "POST", data })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getStudentGeneralInformation = studentId =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student/${studentId}/general-information`,
			method: "GET",
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const updateStudentGeneralInformation = ({ studentId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student/${studentId}/general-information`,
			method: "PATCH",
			data,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getStudentEducations = studentId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/student/${studentId}/education`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addStudentEducation = ({ studentId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student/${studentId}/education`,
			method: "POST",
			data,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const updateStudentEducation = ({ studentId, educationId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student/${studentId}/education/${educationId}`,
			method: "PATCH",
			data,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getStudentDocuments = studentId =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student/${studentId}/document`,
			method: "GET",
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addStudentDocuments = ({ studentId, documents }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student/${studentId}/document`,
			method: "POST",
			data: { documents },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const updateStudentDocument = ({ studentId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student/${studentId}/document`,
			method: "PATCH",
			data: data,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getStudentWorkHistory = studentId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/student/${studentId}/work-history`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addStudentWorkHistory = ({ studentId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student/${studentId}/work-history`,
			method: "POST",
			data,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const updateStudentWorkHistory = ({ studentId, workHistoryId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student/${studentId}/work-history/${workHistoryId}`,
			method: "PATCH",
			data,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getTestScore = studentId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/student/${studentId}/test-score`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addTestScore = ({ studentId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/student/${studentId}/test-score`, method: "POST", data })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const updateTestScore = ({ studentId, testScoreId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student/${studentId}/test-score/${testScoreId}`,
			method: "PATCH",
			data,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getStudentProgress = studentId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/student/${studentId}/progress`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getStudentTasks = studentId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/student/${studentId}/task`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const updateStudentTaskData = ({ studentId, taskId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/student/${studentId}/task/${taskId}`,
			method: "PATCH",
			params: { data },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getStudentPayments = studentId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/student/${studentId}/payment`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addStudentPayment = ({ studentId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/student/${studentId}/payment`, method: "POST", data })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getStudentComments = studentId =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/student/${studentId}/comment`, method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addStudentComments = ({ studentId, data }) =>
	new Promise((resolve, reject) => {
		APICaller({ url: `/student/${studentId}/comment`, method: "POST", data })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const getPreferredCountries = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/student/preferredCountries", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
