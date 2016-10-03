var express = require('express');
var morgan  = require('morgan');
var crypto  = require('crypto');
var gm      = require('gm'), imageMagick = gm.subClass({ imageMagick: true });
var hepburn = require('hepburn');
var argv    = require('minimist')(process.argv.slice(2));
var colors  = require('./lib/colors');

var port    = process.env.PORT || parseInt(argv['port'] || 3004);
var size    = parseInt(argv['size'] || 26);
var s       = parseFloat(argv['s'] || 0.8);
var v       = parseFloat(argv['v'] || 0.8);
var seed    = parseFloat(argv['seed'] || 0.8);
var palette = colors.palette(size, seed, s, v);

var initials = function(text) {
  return hepburn
  .fromKana(text.toUpperCase())
  .substring(0,2);
};

var generateImage = function(size, color, font, text, format) {
  var scale = size/100;

  return imageMagick(size, size, color)
  .fill('#fff')
  .font(font, Math.round(scale * 55))
  .drawText(-1, -3, text, 'Center')
  .setFormat(format);
};

var idToColor = function(id) {
  var idAsHex = crypto.createHash('md5').update(id).digest('hex');
  var idAsNumber = parseInt(idAsHex, 16);
  return palette[idAsNumber % palette.length];
};

var app = express();
app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.use(morgan('combined'));

app.get('/avatar/:id(\\w+)/:initials.:format(svg)?', function(req, res) {
  var color = idToColor(req.params.id);
  var text = initials(req.params.initials);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Vary', 'Accept-Encoding');
  res.render('svg', { color: color, text: text });
});

app.get('/avatar/:id(\\w+)/:initials.:format(png|jpg)', function(req, res, next) {
  var color = idToColor(req.params.id);
  var font = 'src/fonts/opensans-semibold.ttf';
  var text = initials(req.params.initials);
  var format = req.params.format;
  var size = parseInt(req.query.s, 10) || 100;

  res.set('Content-Type', 'image/' + format);
  generateImage(size, color, font, text, format).stream(function(err, stdout) {
    if (err) return next(err);
    stdout.pipe(res);
  });
});

app.get('/colors', function(req, res){
  res.json({palette: palette});
});

app.get('/', function(req, res){
  res.json({status: 'okay'});
});

console.log('Tiley Listening On Port: ' + port);
console.log('Default Palette Size: ' + size);
console.log('Default Seed Value: ' + seed);
console.log('Default Saturation Value: ' + s);
console.log('Default Hue Value: ' + v);

app.listen(port);
