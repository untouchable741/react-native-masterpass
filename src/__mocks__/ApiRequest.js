import PrecheckoutData from '../../__test_data/Precheckout'

class ApiRequest {
	apiConfig = {};
	
	constructor(apiConfig) {
		this.apiConfig = apiConfig;
	}

	precheckout = (authToken, deviceToken) => {
		return new Promise((res, rej) => {
			const baseUrl = this.apiConfig.baseUrl;
			switch (baseUrl) {
				case 'http://localmock-1': {
					return res(PrecheckoutData[0].json)
				}

				case 'http://localmock-2': {
					const response = {
						success: false
					}
					return res(response)
				}	

				default: return null;	
			}
		})
	}
}

export default {
	instantiate(apiConfig) {
		return new ApiRequest(apiConfig);
	}
}