const generateFontSize = require('../generateFontSize');

test('returns 55 when size is 100', () => {
  expect(generateFontSize(100)).toBe(55);
});

test('returns 83 when size is 150', () => {
  expect(generateFontSize(150)).toBe(83);
});

test('returns 110 when size is 200', () => {
  expect(generateFontSize(200)).toBe(110);
});

test('returns 165 when size is 300', () => {
  expect(generateFontSize(300)).toBe(165);
});
