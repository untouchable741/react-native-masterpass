import querystring from 'querystring';
var Buffer = require('buffer/').Buffer;
var parseString = require('react-native-xml2js').parseString;
var stripPrefix = require('react-native-xml2js/lib/processors').stripPrefix;

decodeBase64 = (input) => {
		return Buffer.from(input, 'base64').toString('utf8');
}

class MasterpassApi {
	apiConfig = {
		baseUrl: '',
		authKey: '', 
		brandCode: '',
		pairingRequestUrl: '',
		pairingCheckoutRequestUrl: '',
		precheckoutRequestUrl: '',
		unpairCheckoutRequestUrl: ''
	}

	constructor(apiConfig) {
		this.apiConfig = apiConfig;
	}

	pairingRequest = (authToken, deviceToken) => {
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
	}

	pairingCheckoutRequest = (authToken, deviceToken, amount, store) => {
		const { baseUrl, pairingCheckoutRequestUrl, authKey, brandCode } = this.apiConfig;
		const apiUrl = `${baseUrl}${pairingCheckoutRequestUrl}/${brandCode}`;
		bodyObject = { authToken, deviceToken, amount, store }
		console.log('pairingCheckoutRequest '+apiUrl, bodyObject)
		return fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Authorization': authKey,
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: querystring.stringify(bodyObject)
		}).then(response => response.json());
	}

	precheckoutRequest = (authToken, deviceToken) => {
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
			.then(responseJson => (new Promise((res, rej) => {
				if (!responseJson.success) return rej('precheckoutRequest.success=false');

				var decodedWalletData = decodeBase64(responseJson.walletData);

				parseString(decodedWalletData, {
					explicitArray: false,
					tagNameProcessors: [stripPrefix]
				},
					(error, result) => {
						res({
							...responseJson,
							walletData: result
						})
					});
				}))
			);
	}

	unpairingRequest = (authToken, deviceToken) => {
		const { baseUrl, unpairCheckoutRequestUrl, authKey, brandCode } = this.apiConfig;
		const apiUrl = `${baseUrl}${unpairCheckoutRequestUrl}/${brandCode}`;
		return fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Authorization': authKey,
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: querystring.stringify({ authToken, deviceToken })
		}).then(response => response.json());
	}
}

export default {
	instantiate(apiConfig) {
		return new MasterpassApi(apiConfig);
	}
}