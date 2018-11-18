const { validateHex } = require('../colors');

test('validateHex', () => {
  expect(validateHex(0)).toBe(false);
  expect(validateHex('sdfsd')).toBe(false);
  expect(validateHex('sdfsdff')).toBe(false);
  expect(validateHex('word')).toBe(false);
  expect(validateHex('FFF FFF')).toBe(false);
  expect(validateHex('ZZZZZZ')).toBe(false);

  expect(validateHex('AEAEAE')).toBe(true);
  expect(validateHex('FFFFFF')).toBe(true);
  expect(validateHex('000000')).toBe(true);
  expect(validateHex('045332')).toBe(true);
  expect(validateHex('AE12BF')).toBe(true);
});
