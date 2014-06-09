var express = require('express');
var morgan  = require('morgan')
var gm  = require('gm'), imageMagick = gm.subClass({ imageMagick: true });
var colors = require('./colors.js');
var hepburn = require('hepburn')
var argv = require('minimist')(process.argv.slice(2));

var port = process.env.PORT || parseInt(argv['port'] || 3004);
var size = parseInt(argv['size'] || 26);
var s = parseFloat(argv['s'] || 0.8);
var v = parseFloat(argv['v'] || 0.8);
var seed = parseFloat(argv['seed'] || 0.8);
var defaultPalette = colors.palette(size, seed, s, v)

var initials = function(source){
  var result;
  result = source.toUpperCase();
  result = hepburn.cleanRomaji(result);
  result = hepburn.fromKana(result);
  result = result.substring(0,2);
  return result;
}

var generateImage = function(size, color, font, text, format){
  // this isnt working but would mean we dont need to read the blank image
  // imageMagick(100, 100, color). 
  // read a blank template image
  return imageMagick('fixtures/blank.png').
  fill(color).
  drawRectangle(0.0, size, size).
  fill('#fff').
  font(font, 40).
  drawText(-1, -3, text, 'Center').
  setFormat(format)
}

var app = express();
app.set('view engine', 'ejs');
app.use(morgan())

app.get('/avatar/:id(\\d+)/:initials(\\w{1,2}).svg', function(req, res){
  var color = defaultPalette[req.params.id % defaultPalette.length] 
  var initials = req.params.initials.toUpperCase();
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Vary", "Accept-Encoding");
  res.render('svg', { color:color, text:initials })
});

app.get('/avatar/:id(\\d+)/:initials.:format(png|jpg)', function(req, res){
  var size = 100;
  var color = defaultPalette[req.params.id % defaultPalette.length];
  var font = 'fixtures/opensans-semibold.ttf';
  var text = initials(req.params.initials);
  var format = req.params.format 
  res.set('Content-Type', 'image/' + format);
  generateImage(size, color, font, text, format).stream(function (err, stdout, stderr) {
    if (err) return next(err);
    stdout.pipe(res); 
  });
});

app.get("/colors", function(req, res){
  res.render('colors', { palette:defaultPalette })
})

app.get('/', function(req, res){
  res.render('home')
})

console.log('Sqwiggle Avatars Listening On Port: ' + port)
console.log('Default Palette Size: ' + size)
console.log('Default Seed Value: ' + seed)
console.log('Default Saturation Value: ' + s)
console.log('Default Hue Value: ' + v)
app.listen(port);
