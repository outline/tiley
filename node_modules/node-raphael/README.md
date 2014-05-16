# node-raphael

using the beatiful SVG library [Raphaël](http://raphaeljs.com) in [node.js](http://nodejs.org/) to generate svg-data.

## Features

* static svg generation with raphael

## Installation

make sure you have `node-waf` installed (contained in `nodejs-dev` package).

```bash
npm install node-raphael
```

## Motivation

NIH - not invented here ...
srsly .. i want to generate some good looking charts without using javascript on client side (because this is lame for none-interactive images)

## Usage

```javascript
var raphael = require('node-raphael');
var svg = raphael.generate(width, height, function draw(paper) { … });
```

__WARNING__

[jsdom](http://jsdom.org) just implements a DOM 1.0, which only covers SVG 1.0, but raphael uses SVG 1.1, so features like text may not work.

## Example

SVG Server with [Raphaël Logo](http://raphaeljs.com/gear.html):

 * https://github.com/dodo/node-raphael/blob/master/example/server.js

## TODO

* More documentation
* tests
