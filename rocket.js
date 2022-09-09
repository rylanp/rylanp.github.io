class Rocket{
    constructor(div){
        this.posX = 200;
        this.posY = 200;
        this.angle = 0;
        this.velX = 0;
        this.velY = 0;
        this.div = div;
        this.timestep = 40;
        this.destinationX = 0;
        this.destinationY = 0;
        this.minSqrDist = 50000;
        this.distscale = 1;
        this.gravity = 1000;
        this.friction = 0.3
        this.getNewDestination()
    }
    getNewDestination(){
        this.destinationX = Math.random() * window.innerWidth
        this.destinationY = Math.random() * window.innerHeight
    }
    Lerp(a, b, t){
        return a + t*(b-a)
    }
    Activate(x){
        let value = (2 / (1 + (2.71828182846 ** -x))) - 1
        return value
    }
    move(){
        this.velX *= 1 - (this.friction / this.timestep);
        this.velY *= 1 - (this.friction / this.timestep);
        this.adjustVelocity()
        this.div.style.left = this.posX + 'px';
        this.div.style.top = this.posY + 'px';
    }
    adjustVelocity(){
        let x1 = this.destinationX;
        let y1 = this.destinationY;

        let x2 = this.posX;
        let y2 = this.posY;

        let dirX = x1 - x2;
        let dirY = y1 - y2;
        let sqrdistance = (dirX)*(dirX) + (dirY)*(dirY);
        if (sqrdistance <= this.minSqrDist){
            this.getNewDestination()
        }
        let forceX = this.gravity * dirX / (sqrdistance * this.distscale);
        let forceY = this.gravity * dirY / (sqrdistance * this.distscale);
        let fx = forceX;
        let fy = forceY;

        this.velX += fx;
        this.velY += fy;
        this.posX += this.velX / this.timestep;
        this.posY += this.velY / this.timestep;
    }
    adjustrotation(){
        let x = this.destinationX - this.posX
        let y = this.destinationY - this.posY
        var newangle = Math.atan(y / x) * (180 / Math.PI)
        if (newangle < 0){
            newangle += 360
        }else if (newangle >= 360) {
            newangle -= 360
        }
        if (x > 0 && y > 0){
            newangle += 180
        }
        if (x > 0 && y < 0){
            newangle += 180
        }
        
        this.angle = this.Lerp(this.angle, newangle, 0.03)
    
        this.div.style.transform = 'rotate(' + (this.angle - 90) + 'deg)'
    }
}
var rocket = new Rocket(document.getElementById("rocket"))
// var marker = document.getElementById("marker")
function update(){
    rocket.move()
    rocket.adjustrotation()
    // marker.style.left = rocket.destinationX + "px"
    // marker.style.top = rocket.destinationY + "px"
}
setInterval(update, timestep);