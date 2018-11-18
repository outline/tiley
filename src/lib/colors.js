var self = {
  hsv2rgb(obj) {
    var h = obj.h;
    var s = obj.s;
    var v = obj.v;

    var r;
    var g;
    var b;
    var i;
    var f;
    var p;
    var q;
    var t;

    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));

    if (s === 0) {
      // Achromatic (grey)
      r = g = b = v;
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch (i) {
      case 0:
        r = v; g = t; b = p;
        break;
      case 1:
        r = q; g = v; b = p;
        break;
      case 2:
        r = p; g = v; b = t;
        break;
      case 3:
        r = p; g = q; b = v;
        break;
      case 4:
        r = t; g = p; b = v;
        break;
      default: // case 5:
        r = v; g = p; b = q;
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  },

  validateHex(input) {
    return /[0-9A-Fa-f]{6}/g.test(input);
  },

  hexComponentToString(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  },

  rgb2hexString(obj) {
    let res = '#';
    res += this.hexComponentToString(obj.r);
    res += this.hexComponentToString(obj.g);
    res += this.hexComponentToString(obj.b);
    return res;
  },

  palette(size, seed, s, v) {
    let seeded = seed;
    const result = [];
    const goldenRatioConjugate = 0.618033988749895;

    for (let i = 0; i < size; i++) {
      seeded += goldenRatioConjugate;
      seeded %= 1;
      result[i] = self.rgb2hexString(self.hsv2rgb({ h: (360 * seeded), s, v }));
    }
    return result;
  },

};
module.exports = self;
