var express = require('express');
var morgan  = require('morgan')
var colors = require('./colors.js');
var argv = require('minimist')(process.argv.slice(2));

var size = parseInt(argv['size'] || 26);
var s = parseFloat(argv['s'] || 0.8);
var v = parseFloat(argv['v'] || 0.8);
var seed = parseFloat(argv['seed'] || 0.8);
var defaultPalette = colors.palette(size, seed, s, v)


var app = express();
app.set('view engine', 'ejs');
app.use(morgan())

app.get('/avatar/:id(\\d+)/:initials(\\w{1,2})', function(req, res){
  var color = defaultPalette[req.params.id % defaultPalette.length] 
  var initials = req.params.initials.toUpperCase();
  res.setHeader("Content-Type", "image/svg+xml");
  res.render('svg', { color:color, text:initials })
});

app.get("/colors", function(req, res){
  res.render('colors', { palette:defaultPalette })
})

app.get('/', function(req, res){
  res.render('home')
})

console.log('Sqwiggle Avatars Listening On Port 3005')
console.log('Default Palette Size: ' + size)
console.log('Default Seed Value: ' + seed)
console.log('Default Saturation Value: ' + s)
console.log('Default Hue Value: ' + v)
app.listen(3005);
