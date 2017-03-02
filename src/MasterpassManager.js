import querystring from 'querystring';


module.exports = {
	initialize: (apiConfig) => {
		this.apiConfig = apiConfig
	},

	pairingRequest: (authToken, deviceToken) => {
		const { baseUrl, pairingRequestUrl, authKey, brandCode } = this.apiConfig;
		const apiUrl = `${baseUrl}${pairingRequestUrl}/${brandCode}`;
		return fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Authorization': authKey,
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: querystring.stringify({ authToken, deviceToken })
		}).then(response => response.json());
	},

	pairingCheckoutRequest: (authToken, deviceToken, amount, store) => {
		const { pairingCheckoutRequestUrl, authKey, brandCode } = apiConfig;
		const apiUrl = `${pairingCheckoutRequestUrl}/${brandCode}`;
		return fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Authorization': authKey,
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: querystring.stringify({ authToken, deviceToken, amount, store })
		}).then(response => response.json());
	},

	precheckoutRequest: (apiConfig, authToken, deviceToken) => {
		const { precheckoutRequestUrl, authKey, brandCode } = apiConfig;
		const apiUrl = `${precheckoutRequestUrl}/${brandCode}`;
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
			.then(responseJson => {
				return {
					...responseJson,
					walletData: decodeBase64(responseJson.walletData)
				}
			});
	},
	
	decodeBase64: (input) => {
		return Buffer.from(input, 'base64').toString('utf8');
	}
}