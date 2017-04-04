var Buffer = require('buffer').Buffer;
var parseString = require('react-native-xml2js').parseString;
var stripPrefix = require('react-native-xml2js/lib/processors').stripPrefix;

decodeBase64 = (input) => {
	return new Promise((res, rej) => {
		try {
			result = Buffer.from(input, 'base64').toString('utf8');
			res(result)
		} catch (exception) {
			rej(exception)
		}	
	})
}

parseXmlToJson = (input) => {
	return new Promise((res, rej) => {
		parseString(input, {
			explicitArray: false,
			tagNameProcessors: [stripPrefix]
		}, (error, result) => {
			if (error) rej(error);
			res(result)
		});
	})
}

const TRANSFORMER_NAMES = {
	'xml2json': parseXmlToJson,
	'decodeBase64': decodeBase64
}

transform = (input, transformers) => {
	if (!transformers || transformers.length == 0) return Promise.resolve(input);

	var chaining = TRANSFORMER_NAMES[transformers[0]](input);
	for (var i = 1; i < transformers.length; ++i) {
		let transformer = TRANSFORMER_NAMES[transformers[i]]
		chaining = chaining.then(transformer)
	}

	return chaining;
}

module.exports.transform = transform;