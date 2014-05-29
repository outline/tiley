var express = require('express');
var morgan  = require('morgan')
var gm  = require('gm'), imageMagick = gm.subClass({ imageMagick: true });
var colors = require('./colors.js');
var argv = require('minimist')(process.argv.slice(2));

var port = process.env.PORT || parseInt(argv['port'] || 3004);
var size = parseInt(argv['size'] || 26);
var s = parseFloat(argv['s'] || 0.8);
var v = parseFloat(argv['v'] || 0.8);
var seed = parseFloat(argv['seed'] || 0.8);
var defaultPalette = colors.palette(size, seed, s, v)


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

app.get('/avatar/:id(\\d+)/:initials(\\w{1,2}).png', function(req, res){
  res.set('Content-Type', 'image/png');
  var color = defaultPalette[req.params.id % defaultPalette.length] 
  var initials = req.params.initials.toUpperCase();
  // this isnt working but would meab we dont need to read the blank image
  // imageMagick(100, 100, color). 
  // read a blank template image
  imageMagick('fixtures/blank.png').
  fill(color).
  drawRectangle(0.0,100,100).
  fill('#fff').
  font('fixtures/cabin-regular.ttf', 40).
  drawText(0, 0, initials, 'Center').
  stream(function (err, stdout, stderr) {
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
