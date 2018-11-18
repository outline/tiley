const idToColor = require('../idToColor');

test('returns default color with no input', () => {
  expect(idToColor('')).toBe('#2935cc');
  expect(idToColor('')).toBe('#2935cc');
});

test('returns the same color on multiple calls', () => {
  expect(idToColor('123')).toBe('#2935cc');
  expect(idToColor('123')).toBe('#2935cc');
});

test('works with a hash', () => {
  expect(idToColor('205e460b479e2e5b48aec07710c08d50')).toBe('#29cc7c');
  expect(idToColor('205e460b479e2e5b48aec07710c08d50')).toBe('#29cc7c');
});
