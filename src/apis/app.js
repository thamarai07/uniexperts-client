import { toast } from "react-toastify";
import { _getToken } from "utils/token";

export const s3Upload = data =>
	new Promise((resolve, reject) => {
		const token = _getToken();

		const file = new FormData();
		file.append("file", data);

		const params = {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: file,
		};

		let statusCode = 0;
		// eslint-disable-next-line no-undef
		fetch(`${process.env.REACT_APP_BASE_URL}/s3/upload`, params)
			.then(response => {
				statusCode = response?.status;
				return response.json();
			})
			.then(res => {
				if (statusCode >= 400) {
					toast.error("Something went wrong");
					reject();
				}

				resolve(res?.data?.url);
			});
	});
