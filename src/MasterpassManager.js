import querystring from 'querystring';

module.exports = {
	pairingRequest: (apiConfig, authToken, deviceToken) => {
		const { pairingRequestUrl, authKey, brandCode } = apiConfig;
		const apiUrl = `${pairRequestUrl}/${brandCode}`;
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

	pairingCheckoutRequest: (apiConfig, authToken, deviceToken, amount, store) => {
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
		const { pairingCheckoutRequestUrl, authKey, brandCode } = apiConfig;
		const apiUrl = `${pairingCheckoutRequestUrl}/${brandCode}`;
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