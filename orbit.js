//#region F = 9.8 * (mass1 * mass2) / (sqrdistance)
let mouseX = 0;
let mouseY = 0;
let circle = document.getElementById('cursor');
const onMouseMove = (e) =>{
  circle.style.left = e.pageX + 'px';
  circle.style.top = e.pageY + 'px';
  console.log("X: " + e.pageX);
  console.log("Y: " + e.pageY);
}
document.addEventListener('mousemove', onMouseMove);