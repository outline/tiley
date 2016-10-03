var express = require('express');
var morgan = require('morgan');
var crypto = require('crypto');
var gm = require('gm');
var hepburn = require('hepburn');
var argv = require('minimist')(process.argv.slice(2));
var colors = require('./lib/colors');

var imageMagick = gm.subClass({ imageMagick: true });
var port = process.env.PORT || parseInt(argv.port || 3004, 10);
var size = parseInt(argv.size || 26, 10);
var s = parseFloat(argv.s || 0.8);
var v = parseFloat(argv.v || 0.8);
var seed = parseFloat(argv.seed || 0.8);
var palette = colors.palette(size, seed, s, v);
var app = express();

function initials(text) {
  return hepburn
  .fromKana(text.toUpperCase())
  .substring(0, 2);
}

function generateImage(imageSize, color, font, text, format) {
  var scale = imageSize / 100;

  return imageMagick(imageSize, imageSize, color)
  .fill('#fff')
  .font(font, Math.round(scale * 55))
  .drawText(-1, -3, text, 'Center')
  .setFormat(format);
}

function idToColor(id) {
  var idAsHex = crypto.createHash('md5').update(id).digest('hex');
  var idAsNumber = parseInt(idAsHex, 16);
  return palette[idAsNumber % palette.length];
}

app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.use(morgan('combined'));

app.get('/avatar/:id(\\w+)/:initials.:format(png|jpg)', (req, res, next) => {
  var color = idToColor(req.params.id);
  var font = 'src/fonts/opensans-semibold.ttf';
  var text = initials(req.params.initials);
  var format = req.params.format;
  var imageSize = parseInt(req.query.s, 10) || 100;

  res.set('Content-Type', `image/${format}`);
  generateImage(imageSize, color, font, text, format).stream((err, stdout) => {
    if (err) return next(err);
    return stdout.pipe(res);
  });
});

app.get('/avatar/:id(\\w+)/:initials.:format(svg)?', (req, res) => {
  var color = idToColor(req.params.id);
  var text = initials(req.params.initials);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Vary', 'Accept-Encoding');
  res.render('svg', { color, text });
});

app.get('/colors', (req, res) => {
  res.json({ palette });
});

app.get('/', (req, res) => {
  res.json({ status: 'okay' });
});

console.log(`Tiley Listening On Port: ${port}`);
console.log(`Default Palette Size: ${size}`);
console.log(`Default Seed Value: ${seed}`);
console.log(`Default Saturation Value: ${s}`);
console.log(`Default Hue Value: ${v}`);

app.listen(port);
