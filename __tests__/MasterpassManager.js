import MasterpassManager from '../src/MasterpassManager';

test('decode base64', () => {
	expect(MasterpassManager.decodeBase64('YWRtaW4yMzU5')).toBe('admin2359');
})

test('decode base64', () => {
	expect(MasterpassManager.decodeBase64('a2hvaS5uZ3V5ZW5hbmhAMjM1OW1lZGlhLmNvbQ==')).toBe('khoi.nguyenanh@2359media.com');
})

test('decode base64', () => {
	expect(MasterpassManager.decodeBase64('ISlAKCYlISkmQF8pJF4hKiZAXyko')).toBe('!)@(&%!)&@_)$^!*&@_)(');
})