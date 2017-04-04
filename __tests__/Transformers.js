import Transformers from '../src/Transformers';

const Samples = [
	{
		base64: 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxQcmVDaGVja291dERhdGEgeG1sbnM6bnMyPSJodHRwOi8vdGVtcHVyaS5vcmcvTWFzdGVyUGFzc0V4cHJlc3NDaGVja291dENvbW1vblR5cGUueHNkIj48bnMyOldBTExFVE5BTUU+Q2F0aGF5VW5pdGVkQmFua1Y2MjwvbnMyOldBTExFVE5BTUU+PG5zMjpQUkVDSEVDS1RSQU5TQUNUSU9OSUQ+YTRhNng1NS10MXBpemUtajBjZW5jYmItMS1qMGczbDRscC0yajllPC9uczI6UFJFQ0hFQ0tUUkFOU0FDVElPTklEPjxuczI6Q09OU1VNRVJXQUxMRVRJRD4yMDE2MDgxMDE3MDYxNTMwODwvbnMyOkNPTlNVTUVSV0FMTEVUSUQ+PC9QcmVDaGVja291dERhdGE+',

		xml: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><PreCheckoutData xmlns:ns2="http://tempuri.org/MasterPassExpressCheckoutCommonType.xsd"><ns2:WALLETNAME>CathayUnitedBankV62</ns2:WALLETNAME><ns2:PRECHECKTRANSACTIONID>a4a6x55-t1pize-j0cencbb-1-j0g3l4lp-2j9e</ns2:PRECHECKTRANSACTIONID><ns2:CONSUMERWALLETID>20160810170615308</ns2:CONSUMERWALLETID></PreCheckoutData>',

		json: {
			PreCheckoutData: {
				'$': {
					'xmlns:ns2': 'http://tempuri.org/MasterPassExpressCheckoutCommonType.xsd'
				},
				WALLETNAME: 'CathayUnitedBankV62',
				PRECHECKTRANSACTIONID: 'a4a6x55-t1pize-j0cencbb-1-j0g3l4lp-2j9e',
				CONSUMERWALLETID: '20160810170615308'
			}
		}
	},
	
	{
		base64: 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxQcmVDaGVja291dERhdGEgeG1sbnM6bnMyPSJodHRwOi8vdGVtcHVyaS5vcmcvTWFzdGVyUGFzc0V4cHJlc3NDaGVja291dENvbW1vblR5cGUueHNkIj48bnMyOldBTExFVE5BTUU+Q2F0aGF5VW5pdGVkQmFua1Y2MjwvbnMyOldBTExFVE5BTUU+PG5zMjpQUkVDSEVDS1RSQU5TQUNUSU9OSUQ+YTRhNng1NS10MXBpemUtajBjZW5jYmItMS1qMGczbDRscC0yajllPC9uczI6UFJFQ0hFQ0tUUkFOU0FDVElPTklEPjxuczI6Q09OU1VNRVJXQUxMRVRJRD4yMDE2MDgxMDE3MDYxNTMwODwvbnMyOkNPTlNVTUVSV0FMTEVUSUQ+PG5zMjpQUk9GSUxFPjxuczI6RklSU1ROQU1FPmU0YzJjNzE2NDc5YmU4YWE8L25zMjpGSVJTVE5BTUU+PG5zMjpNSURETEVOQU1FPjwvbnMyOk1JRERMRU5BTUU+PG5zMjpMQVNUTkFNRT5lNGMyYzcxNjQ3OWJlOGFhPC9uczI6TEFTVE5BTUU+PG5zMjpFTUFJTEFERFJFU1M+MzBiYWU3ZjgyOWQ2ODFkMmZmY2M4ZjUwYjRhNDc3MWM3OWQ3OTFkMzdiZmFlOGEwPC9uczI6RU1BSUxBRERSRVNTPjxuczI6UEhPTkVOVU1CRVI+MzE0NWFjMTcwYWE5M2ZlYjY5OTUxMjRhMDUyOGNhMDQ8L25zMjpQSE9ORU5VTUJFUj48L25zMjpQUk9GSUxFPjxuczI6Q0FSRFM+PG5zMjpDQVJEPjxuczI6Q0FSRElEPjAwMDAwMzwvbnMyOkNBUkRJRD48bnMyOkJSQU5ESUQ+bWFzdGVyPC9uczI6QlJBTkRJRD48bnMyOkJSQU5ETkFNRT5NYXN0ZXJDYXJkPC9uczI6QlJBTkROQU1FPjxuczI6TEFTVEZPVVI+ODAxMjwvbnMyOkxBU1RGT1VSPjxuczI6U0VUREVGQVVMVD50cnVlPC9uczI6U0VUREVGQVVMVD48L25zMjpDQVJEPjxuczI6Q0FSRD48bnMyOkNBUkRJRD4wMDAwMDQ8L25zMjpDQVJESUQ+PG5zMjpCUkFORElEPnZpc2E8L25zMjpCUkFORElEPjxuczI6QlJBTkROQU1FPlZpc2E8L25zMjpCUkFORE5BTUU+PG5zMjpMQVNURk9VUj44MDEyPC9uczI6TEFTVEZPVVI+PC9uczI6Q0FSRD48L25zMjpDQVJEUz48L1ByZUNoZWNrb3V0RGF0YT4=',

		xml: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><PreCheckoutData xmlns:ns2="http://tempuri.org/MasterPassExpressCheckoutCommonType.xsd"><ns2:WALLETNAME>CathayUnitedBankV62</ns2:WALLETNAME><ns2:PRECHECKTRANSACTIONID>a4a6x55-t1pize-j0cencbb-1-j0g3l4lp-2j9e</ns2:PRECHECKTRANSACTIONID><ns2:CONSUMERWALLETID>20160810170615308</ns2:CONSUMERWALLETID><ns2:PROFILE><ns2:FIRSTNAME>e4c2c716479be8aa</ns2:FIRSTNAME><ns2:MIDDLENAME></ns2:MIDDLENAME><ns2:LASTNAME>e4c2c716479be8aa</ns2:LASTNAME><ns2:EMAILADDRESS>30bae7f829d681d2ffcc8f50b4a4771c79d791d37bfae8a0</ns2:EMAILADDRESS><ns2:PHONENUMBER>3145ac170aa93feb6995124a0528ca04</ns2:PHONENUMBER></ns2:PROFILE><ns2:CARDS><ns2:CARD><ns2:CARDID>000003</ns2:CARDID><ns2:BRANDID>master</ns2:BRANDID><ns2:BRANDNAME>MasterCard</ns2:BRANDNAME><ns2:LASTFOUR>8012</ns2:LASTFOUR><ns2:SETDEFAULT>true</ns2:SETDEFAULT></ns2:CARD><ns2:CARD><ns2:CARDID>000004</ns2:CARDID><ns2:BRANDID>visa</ns2:BRANDID><ns2:BRANDNAME>Visa</ns2:BRANDNAME><ns2:LASTFOUR>8012</ns2:LASTFOUR></ns2:CARD></ns2:CARDS></PreCheckoutData>',

		json: {
			PreCheckoutData: {
				'$': {
					'xmlns:ns2': 'http://tempuri.org/MasterPassExpressCheckoutCommonType.xsd'
				},
				WALLETNAME: 'CathayUnitedBankV62',
				PRECHECKTRANSACTIONID: 'a4a6x55-t1pize-j0cencbb-1-j0g3l4lp-2j9e',
				CONSUMERWALLETID: '20160810170615308',
				PROFILE: {
					FIRSTNAME: 'e4c2c716479be8aa',
					MIDDLENAME: '',
					LASTNAME: 'e4c2c716479be8aa',
					EMAILADDRESS: '30bae7f829d681d2ffcc8f50b4a4771c79d791d37bfae8a0',
					PHONENUMBER: '3145ac170aa93feb6995124a0528ca04' },
				CARDS: {
					CARD: [
						{
							CARDID: '000003',
        			BRANDID: 'master',
        			BRANDNAME: 'MasterCard',
        			LASTFOUR: '8012',
							SETDEFAULT: 'true'
						},
						{
							CARDID: '000004',
        			BRANDID: 'visa',
        			BRANDNAME: 'Visa',
							LASTFOUR: '8012'
						}
					]
				}
			}
		}
	}
]

test('1. decode base64', done => {
	Transformers.transform('YWRtaW4yMzU5', ['decodeBase64'])
		.then(result => {
			expect(result).toBe('admin2359')
			done();
		})
})

test('2. decode base64', done => {
	Transformers.transform('a2hvaS5uZ3V5ZW5hbmhAMjM1OW1lZGlhLmNvbQ==', ['decodeBase64'])
		.then(result => {
			expect(result).toBe('khoi.nguyenanh@2359media.com');
			done();
		})
})

test('3. decode base64', done => {
	Transformers.transform('ISlAKCYlISkmQF8pJF4hKiZAXyko', ['decodeBase64'])
		.then(result => {
			expect(result).toBe('!)@(&%!)&@_)$^!*&@_)(');
			done();
		})
})

test('4. decode base64 XML', done => {
	Transformers.transform(Samples[0].base64, ['decodeBase64'])
		.then(result => {
			expect(result).toBe(Samples[0].xml);
			done();
		})
})

test('5. decode base64 XML then xml2json _ sample 1', done => {
	Transformers.transform(Samples[0].base64, ['decodeBase64', 'xml2json'])
		.then(result => {
			expect(result).toEqual(Samples[0].json)
			done();
		})
})

test('6. decode base64 XML then xml2json _ sample 2', done => {
	Transformers.transform(Samples[1].base64, ['decodeBase64', 'xml2json'])
		.then(result => {
			expect(result).toEqual(Samples[1].json)
			done();
		})
})

test('7. xml2json _ sample 1', done => {
	Transformers.transform(Samples[0].xml, ['xml2json'])
		.then(result => {
			expect(result).toEqual(Samples[0].json)
			done();
		})
})

test('7. xml2json _ sample 2', done => {
	Transformers.transform(Samples[1].xml, ['xml2json'])
		.then(result => {
			expect(result).toEqual(Samples[1].json)
			done();
		})
})