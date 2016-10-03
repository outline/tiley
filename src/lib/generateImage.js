var gm = require('gm');

var imageMagick = gm.subClass({ imageMagick: true });

function generateImage(imageSize, color, font, text, format) {
  var scale = imageSize / 100;

  return imageMagick(imageSize, imageSize, color)
  .fill('#fff')
  .font(font, Math.round(scale * 55))
  .drawText(-1, -3, text, 'Center')
  .setFormat(format);
}

module.exports = generateImage;
