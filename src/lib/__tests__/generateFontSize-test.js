test('returns 55 when size is 100', () => {
  var generateFontSize = require('../generateFontSize');
  expect(generateFontSize(100)).toBe(55);
});

test('returns 83 when size is 150', () => {
  var generateFontSize = require('../generateFontSize');
  expect(generateFontSize(150)).toBe(83);
});

test('returns 110 when size is 200', () => {
  var generateFontSize = require('../generateFontSize');
  expect(generateFontSize(200)).toBe(110);
});

test('returns 165 when size is 300', () => {
  var generateFontSize = require('../generateFontSize');
  expect(generateFontSize(300)).toBe(165);
});
