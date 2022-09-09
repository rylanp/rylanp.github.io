// dots is an array of Dot objects,
// mouse is an object used to track the X and Y position
// of the mouse, set with a mousemove event listener below
var dotstrail = [],
   rocketPos = {
     x: 0,
     y: 0
   };
var rocketdiv = document.getElementById("rocket")

// The Dot object used to scaffold the dots
var Dot = function() {
 this.x = 0;
 this.y = 0;
 this.node = (function(){
   var n = document.createElement("div");
   n.className = "rockettrailelement";
   document.body.appendChild(n);
   return n;
 }());
};
// The Dot.prototype.draw() method sets the position of 
 // the object's <div> node
Dot.prototype.draw = function() {
 this.node.style.left = this.x + "px";
 this.node.style.top = this.y + "px";
};

// Creates the Dot objects, populates the dots array
for (var i = 0; i < 20; i++) {
 var d = new Dot();
 d.node.style.width = 12-(0.25*i) + "px";
 d.node.style.height = 12-(0.25*i) + "px";
 dotstrail.push(d);
}

// This is the screen redraw function
function drawdots() {
 // Make sure the mouse position is set everytime
   // draw() is called.
 var x = rocketPos.x,
     y = rocketPos.y;
 
 // This loop is where all the 90s magic happens
 dotstrail.forEach(function(dot, index, dotstrail) {
   var nextDot = dotstrail[index + 1] || dotstrail[0];
   
   dot.x = x;
   dot.y = y;
   dot.draw();
   x += (nextDot.x - dot.x) * .85;
   y += (nextDot.y - dot.y) * .85;
 });
}
var scrollPosY = 0
var scrollPosX = 0
function updatetrail(){
    rocketPos.x = parseFloat(rocketdiv.style.left.replace("px", "")) + 20;
    rocketPos.y = parseFloat(rocketdiv.style.top.replace("px", "")) + 21;
    animatedots();
};

// animate() calls draw() then recursively calls itself
 // everytime the screen repaints via requestAnimationFrame().
function animatedots() {
 drawdots();
}

setInterval(updatetrail, timestep)