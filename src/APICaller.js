import React from 'react';
import { toast } from "react-toastify";
import { _getToken } from "utils/token";

// eslint-disable-next-line no-undef
const createURL = url => "http://3.111.32.21/api" + url;
//const createURL = url => "http://localhost:5000/api" + url;


const APICaller = ({ url, method, data, params }) => {

	let updatedUrl = createURL(url);

	let token = _getToken()

	const requestParams = {
		method,
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	};

	if (method !== "GET" && method !== "DELETE") {
		requestParams.headers["Content-Type"] = "application/json";
		requestParams.body = JSON.stringify(data);
	}

	if ((method === "GET" || method === "PATCH") && params) {
		for (const [key, value] of Object.entries(params)) {
			if (value)
				updatedUrl += `${updatedUrl?.includes("?") ? "&" : "?"}${key}=${value}`;
		}
	}

	let statusCode = 0;
	return fetch(updatedUrl, requestParams)
		.then(response => {
			statusCode = response.status;
			return response ? response.json() : response;
		})
		.then(res => {
			if (statusCode >= 400) {
				toast.error(
					Array.isArray(res?.message) ? res?.message[0] : res?.message
				);
				// console.log(
				// 	Array.isArray(res?.message) ? res?.message[0] : res?.message
				// );
				throw new Error(res?.message);
			}

			if (res.meta) {
				return { data: res.data, meta: res.meta };
			}
			console.log(res)
			return res.data ? res.data : res;
		});
};

export default APICaller;
