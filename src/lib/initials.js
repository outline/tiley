var hepburn = require('hepburn');

function initials(text) {
  return hepburn
  .fromKana(text.toUpperCase())
  .substring(0, 2);
}

module.exports = initials;
