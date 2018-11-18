function generateFontSize(imageSize) {
  const scale = imageSize / 100;
  return Math.round(scale * 55);
}

module.exports = generateFontSize;
