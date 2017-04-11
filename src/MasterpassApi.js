import querystring from 'querystring';
import * as Errors from './Errors'
import Transformers from './Transformers'
import ApiRequest from './ApiRequest'

class MasterpassApi {
	apiConfig = {
		// baseUrl: '',
		// authKey: '', 
		// brandCode: '',
		// pairingRequestUrl: '',
		// pairingCheckoutRequestUrl: '',
		// precheckoutRequestUrl: '',
		// unpairCheckoutRequestUrl: ''
	}

	apiRequest = null;

	constructor(apiConfig) {
		this.apiConfig = apiConfig;
		this.apiRequest = ApiRequest.instantiate(apiConfig);
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

	precheckoutRequest = (authToken, deviceToken, transformers) => {
		return this.apiRequest.precheckout(authToken, deviceToken)
			.then(responseJson => (new Promise((res, rej) => {
				if (!responseJson.success) return rej({
					code: Errors.EC_FAILURE_RESPONSE,
					message: responseJson.message
				});

				Transformers.transform(responseJson.walletData, transformers)
				.then(result => {
					var jsonResult = result;
					if (typeof jsonResult === 'string') {
						jsonResult = JSON.parse(jsonResult);
					}

					res({
							...responseJson,
							walletData: jsonResult
					})
				}).catch(error => {
					rej(error);
				})
				})));
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