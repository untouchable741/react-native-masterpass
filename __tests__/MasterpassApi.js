jest.mock('../src/ApiRequest')
import MasterpassApi from '../src/MasterpassApi'
import * as Errors from '../src/Errors'
import Samples from '../__test_data/MasterpassApi'

test('test precheckout _ sample 1', done => {
	const apiConfig = {
		baseUrl: 'http://localmock-1',
		authKey: 'q4bNJeJ5xmlXBD0zxuo7ho1BbPrOm8Yl', 
		brandCode: 'cama',
		pairingRequestUrl: '/api/1.0/cub/pairingRequest/',
		pairingCheckoutRequestUrl: '/api/1.0/cub/pairingCheckoutRequest/',
		precheckoutRequestUrl: '/api/1.0/cub/precheckoutRequest',
		unpairCheckoutRequestUrl: '/api/1.0/cub/unpairingRequest/',
	}

	const masterpassApi = MasterpassApi.instantiate(apiConfig);
	masterpassApi.precheckoutRequest('authToken', 'deviceToken', ['decodeBase64', 'xml2json'])
		.then(result => {
			expect(result).toEqual(Samples[0].json);
			done();
		})
})

test('test precheckout _ failure response', done => {
	const apiConfig = {
		baseUrl: 'http://localmock-2',
		authKey: 'q4bNJeJ5xmlXBD0zxuo7ho1BbPrOm8Yl', 
		brandCode: 'cama',
		pairingRequestUrl: '/api/1.0/cub/pairingRequest/',
		pairingCheckoutRequestUrl: '/api/1.0/cub/pairingCheckoutRequest/',
		precheckoutRequestUrl: '/api/1.0/cub/precheckoutRequest',
		unpairCheckoutRequestUrl: '/api/1.0/cub/unpairingRequest/',
	}

	const masterpassApi = MasterpassApi.instantiate(apiConfig);
	masterpassApi.precheckoutRequest('authToken', 'deviceToken', ['decodeBase64', 'xml2json'])
		.catch(error => {
			expect(error.code).toBe(Errors.EC_FAILURE_RESPONSE)
			done();
		})
})
