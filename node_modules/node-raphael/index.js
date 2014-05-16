var fs = require('fs')
  , vm = require('vm')
  , jsdom = require('jsdom')

var script = loadRaphael()
module.exports.generate = function generate(width, height, callback) {
    var win = jsdom.createWindow(jsdom.dom)
        , doc = jsdom.jsdom("<html><body></body></html>")
    var nav = win.navigator
    win.document = doc
    doc.implementation.addFeature(
        "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
    paper = extractRaphael(win, doc, nav)(0, 0, width || 42, height || 42)
    if (callback) callback(paper)
    return doc.body.firstChild && doc.body.firstChild.outerHTML || ""
}

function loadRaphael() {
    var filename = require.resolve('raphael/raphael')
    var code = fs.readFileSync(filename)
    code = code.toString('utf-8').replace("})(this);", "})(this);eve = window.eve;") // HACK
    code = "(function () {" + code + "}).call(window)"
    return vm.createScript(code, filename)
}

function extractRaphael(win, doc, nav) {
    win.Raphael = {} // to get Raphael to overwrite this one and fill the _engine
    script.runInNewContext({
        window:    win,
        document:  doc,
        navigator: nav,
        console:   console,
        setTimeout: setTimeout,
        setInterval: setInterval,
    })
    return win.Raphael
}
