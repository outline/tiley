const initials = require('../initials');

test('returns initials', () => {
  expect(initials('TM')).toBe('TM');
});

test('returns first two letters', () => {
  expect(initials('Hello')).toBe('HE');
});

test('returns katakana as initials', () => {
  expect(initials('カタ')).toBe('KA');
});

test('returns utf8 characters', () => {
  expect(initials('汉语')).toBe('汉语');
});
