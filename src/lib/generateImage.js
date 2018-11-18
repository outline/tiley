const gm = require('gm');
const generateFontSize = require('./generateFontSize');

const imageMagick = gm.subClass({ imageMagick: true });

function generateImage(imageSize, color, font, text, format) {
  return imageMagick(imageSize, imageSize, color)
  .fill('#fff')
  .font(font, generateFontSize(imageSize))
  .drawText(-1, -3, text, 'Center')
  .setFormat(format);
}

module.exports = generateImage;
