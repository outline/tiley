test('returns initials', () => {
  var initials = require('../initials');
  expect(initials('TM')).toBe('TM');
});

test('returns first two letters', () => {
  var initials = require('../initials');
  expect(initials('Hello')).toBe('HE');
});

test('returns katakana as initials', () => {
  var initials = require('../initials');
  expect(initials('カタ')).toBe('KA');
});

test('returns utf8 characters', () => {
  var initials = require('../initials');
  expect(initials('汉语')).toBe('汉语');
});
