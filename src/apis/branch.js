import APICaller from "APICaller";

export const getBranch = () =>
	new Promise((resolve, reject) => {
		APICaller({ url: "/branch", method: "GET" })
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const updateBranchStatus = ({ branchId, isActive }) =>
	new Promise((resolve, reject) => {
		APICaller({
			url: `/branch/${branchId}/status`,
			method: "PATCH",
			data: { isActive },
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});

export const addBranch = data =>
	new Promise((resolve, reject) => {
		APICaller({
			url: "/branch/",
			method: "POST",
			data: data,
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	});
