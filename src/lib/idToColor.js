var crypto = require('crypto');
var colors = require('./colors');
var argv = require('minimist')(process.argv.slice(2));

var size = parseInt(argv.size || 26, 10);
var s = parseFloat(argv.s || 0.8);
var v = parseFloat(argv.v || 0.8);
var seed = parseFloat(argv.seed || 0.8);
var palette = colors.palette(size, seed, s, v);

function idToColor(id) {
  var idAsHex = crypto.createHash('md5').update(id).digest('hex');
  var idAsNumber = parseInt(idAsHex, 16);
  return palette[idAsNumber % palette.length];
}

module.exports = idToColor;
