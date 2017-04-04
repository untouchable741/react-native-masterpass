import querystring from 'querystring';

class ApiRequest {
	constructor(apiConfig) {
		this.apiConfig = apiConfig;
	}

	precheckout = (authToken, deviceToken) => {
		const { baseUrl, precheckoutRequestUrl, authKey, brandCode } = this.apiConfig;
		var apiUrl = `${baseUrl}${precheckoutRequestUrl}/${brandCode}`;
		return fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Authorization': authKey,
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: querystring.stringify({ authToken, deviceToken })
		})
			.then(response => response.json())
	}
}

export default {
	instantiate(apiConfig) {
		return new ApiRequest(apiConfig);
	}
}