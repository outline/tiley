var express = require('express');
var morgan = require('morgan');
var initials = require('./lib/initials');
var generateImage = require('./lib/generateImage');
var generateFontSize = require('./lib/generateFontSize');
var idToColor = require('./lib/idToColor');
var argv = require('minimist')(process.argv.slice(2));

var port = process.env.PORT || parseInt(argv.port || 3004, 10);
var app = express();

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
  var imageSize = parseInt(req.query.s, 10) || 100;
  var fontSize = generateFontSize(imageSize);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Vary', 'Accept-Encoding');
  res.render('svg', { color, text, imageSize, fontSize });
});

app.get('/', (req, res) => {
  res.json({ status: 'okay' });
});

console.log(`Tiley Listening On Port: ${port}`);
app.listen(port);
