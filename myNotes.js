   
var canvasWidth = screen.width - 20
var canvasHeight = canvasWidth

var strokeColor = 'black'
var mouseDown = false
var isMouseDown = false
var lastLoc = { x: 0, y: 0 }
var lastTimetamp = 0
var lastLineWidth = -1
var canvas = document.getElementById('MisNotas')
var context = canvas.getContext('2d')

canvas.height = canvasHeight
canvas.width = canvasWidth




 function beginStroke(point) {
    isMouseDown = true
    lastLoc = windowToCanvas(point.x, point.y)
    lastTimetamp = new Date().getTime();
}

function endStroke() {
    isMouseDown = false
}

function moveStroke(point) {
    var curLoc = windowToCanvas(point.x, point.y);
    var curTimestamp = new Date().getTime();
    var s = calcDistance(curLoc, lastLoc)
    var t = curTimestamp - lastTimetamp
   var lineWidth = document.getElementById("selLinea").value 
   // var lineWidth = calcLineWidth(t, s)
        //draw
    context.beginPath();
    context.moveTo(lastLoc.x, lastLoc.y);
    context.lineTo(curLoc.x, curLoc.y);

    context.strokeStyle = strokeColor;
    context.lineWidth = lineWidth;
    context.lineCap = "round"
    context.lineJoin = "round"
    context.stroke();

    lastLoc = curLoc;
    lastTimetamp = curTimestamp
    lastLineWidth = lineWidth
}


canvas.onmousedown = function(e) {
    mouseDown = true
    e.preventDefault();
    beginStroke({ x: e.clientX, y: e.clientY })

}
 window.onmouseup = function(e) {
            e.preventDefault();
            mouseDown = false
            endStroke()
        }
canvas.onmouseout = function(e) {
    e.preventDefault();
    endStroke()
}
canvas.onmouseover = function(e) {
    e.preventDefault();
    if (mouseDown) { beginStroke({ x: e.clientX, y: e.clientY }) }


}
canvas.onmousemove = function(e) {
    e.preventDefault();
    if (isMouseDown) {
        moveStroke({ x: e.clientX, y: e.clientY })
    }
}


var maxLineWidth = 25;
var minLineWidth = 1;
var maxStrokeV = 10;
var minStrokeV = 0.1;

function calcLineWidth(t, s) {
    var v = s / t;
    var resultLineWidth;
    if (v <= minStrokeV) {
        resultLineWidth = minLineWidth;
    } else if (v >= maxStrokeV) {
        resultLineWidth = maxLineWidth;
    } else {
        resultLineWidth = maxLineWidth - (v - minStrokeV) / (maxStrokeV - minStrokeV) * (maxLineWidth - minLineWidth);
    }
    if (lastLineWidth == -1) {
        return resultLineWidth;
    }
   return resultLineWidth * 1 / 4 + lastLineWidth * 3 / 4;
   //resultLineWidth = document.getElementById("selLinea").value

   return resultLineWidth
}

function calcDistance(loc1, loc2) {
    return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y))
}

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: Math.round(x - bbox.left), y: Math.round(y - bbox.top) }
}










function borrar()
{
  canvas.width = canvas.width;
}

function cColor(test)
{
  var test1 = test
  strokeColor = test1
 context.lineWidth = recoverlinewidth;
 
}
function cClear()
{
 strokeColor="white";
 recoverlinewidth=context.lineWidth
 context.lineWidth = 8;
}

function limpie()
{
 context.clearRect(0, 0, canvas.width, canvas.height);
}
function guarde()
{    
var dt = MisNotas.toDataURL();
this.href = dt;
}


