var raphael = require("./")

var pData = "M444.021,312.011c0,0,201.1,35.165,138.462,82.417c0,0,105.495,67.032,41.759,59.341  s-85.715,21.979-85.715,21.979l-118.682,13.187l-223.077-88.461l72.528-4.945l-157.143-38.461l143.956-2.198  c0,0,35.165-162.638,68.132-154.945s84.616-89.541,84.616-0.265S444.021,312.011,444.021,312.011z"

var svg = raphael.generate(800, 600, function (paper) {

    var path = paper.path(pData)

    console.error(path.getBBox().toString())

})

console.log(svg)
