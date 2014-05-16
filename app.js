var express = require('express');
var raphael = require('node-raphael');
var colors = require('./colors.js');

var app = express();

var palette = []
var s = 0.8;
var v = 0.8
var goldenRatioConjugate = 0.618033988749895

var seed = 50

for (var i = 0; i < 26 ; i++) {
  seed += goldenRatioConjugate;
  seed %= 1;
  palette[i] = colors.rgb2hexString(colors.hsv2rgb({h:(360 * seed), s:s, v:v}));
}

var generateSqwigitar = function(color, text){
  var svg = raphael.generate(100, 100, function draw(paper) { 
    var rect = paper.rect(0, 0, 100, 100);
    rect.attr("fill", color);
    rect.attr("stroke", color);
    var t = paper.text(50, 68, text);
    t.attr({ "font-size": 61, "font-family": "Arial, Helvetica, sans-serif", "fill":"#fff" });
  });
  return svg;
}

app.get('/:id/:initials', function(req, res){
  res.writeHead(200, {"Content-Type": "image/svg+xml"});
  var color = palette[req.params.id % palette.length] 
  var initials = req.params.initials.toUpperCase();
  var svg = generateSqwigitar(color, initials)
  res.end(svg);
});

app.get("/colors", function(req, res){
  palette.forEach(function(color){
    res.write('<div style="width:100px;height:100px;background-color:' + color  + '"></div>')
  })
})

console.log('Sqwiggle Avatars listening on port 3005')
app.listen(3005);
