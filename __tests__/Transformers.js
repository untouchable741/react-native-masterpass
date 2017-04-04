import Transformers from '../src/Transformers';

import Samples from '../__test_data/Transformers'

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

test('8. xml2json _ sample 2', done => {
	Transformers.transform(Samples[1].xml, ['xml2json'])
		.then(result => {
			expect(result).toEqual(Samples[1].json)
			done();
		})
})