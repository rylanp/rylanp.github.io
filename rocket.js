rocket = document.getElementById("rocket");
posX = 500;
posY = 300;
velX = 0
velY = 0
angle = 30
timestep = 40
speed = 50
destinationX = 0
destinationY = 0
minSqrDist = 100
function update(){
    sqrdist = ((posX - destinationX) ** 2) + ((posY - destinationY) ** 2)
    if (sqrdist <= minSqrDist){
        GetNewDestination()
    }
    dirX = destinationX - posX
    dirY = destinationY - posY
    velX += dirX
    velY += dirY
    posX += speed * activate(velX) / timestep
    posY += speed * activate(velY) / timestep

    newangle = Math.atan(activate(velY) / activate(velX)) * (180 / Math.PI)
    if (activate(velX) > 0 && activate(velY) > 0){
        newangle += 180
    }
    if (activate(velX) > 0 && activate(velY) < 0){
        newangle += 180
    }
    if (newangle < 0){
        newangle += 360;
    }

    angle = (angle + newangle) / 2

    rocket.style.transform = 'rotate(' + (angle - 90) + 'deg)'
    rocket.style.left = posX + "px";
    rocket.style.top = posY + "px";

    velX *= 1 - (0.05 / timestep)
    velY *= 1 - (0.05 / timestep)
}
function activate(x){
    var value = (2 / (1 + (2.71828182846 ** -x))) - 1
    return value
}
function GetNewDestination(){
    destinationX = Math.random() * window.innerWidth
    destinationY = Math.random() * window.innerHeight
}
GetNewDestination()
setInterval(update, timestep);