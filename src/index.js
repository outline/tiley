const express = require('express');
const morgan = require('morgan');
const initials = require('./lib/initials');
const generateImage = require('./lib/generateImage');
const generateFontSize = require('./lib/generateFontSize');
const idToColor = require('./lib/idToColor');
const { validateHex } = require('./lib/colors');
const errorHandlingMiddleware = require('./middlewares/errorHandling');
const argv = require('minimist')(process.argv.slice(2));

const port = process.env.PORT || parseInt(argv.port || 3004, 10);
const app = express();

function getColor(req) {
  if (req.query.c) {
    if (validateHex(req.query.c)) {
      return `#${req.query.c}`;
    }
    const error = new Error('Invalid color parameter');
    error.code = 'invalid_color';
    error.status = 422;
    throw error;
  }

  return idToColor(req.params.id);
}

app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.use(morgan('combined'));

app.get('/avatar/:id(\\w+)/:initials.:format(png|jpg)', (req, res, next) => {
  const color = getColor(req);
  const text = initials(req.params.initials);
  const font = 'src/fonts/opensans-semibold.ttf';
  const format = req.params.format;
  const imageSize = parseInt(req.query.s, 10) || 100;

  res.set('Content-Type', `image/${format}`);
  generateImage(imageSize, color, font, text, format).stream((err, stdout) => {
    if (err) return next(err);
    return stdout.pipe(res);
  });
});

app.get('/avatar/:id(\\w+)/:initials.:format(svg)?', (req, res) => {
  const color = getColor(req);
  const text = initials(req.params.initials);
  const imageSize = parseInt(req.query.s, 10) || 100;
  const fontSize = generateFontSize(imageSize);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('vary', 'Accept-Encoding');
  res.render('svg', { color, text, imageSize, fontSize });
});

app.get('/', (req, res) => {
  res.json({ status: 'okay' });
});

app.use(errorHandlingMiddleware);

console.log(`Listening: http://localhost:${port}`);

app.listen(port);
