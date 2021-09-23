//#region F = 10 * (mass1 * mass2) * vector direction / (vector magnitiude)
let timestep = 10; //# milliseconds
let gravity = 10;

let balldiv = document.getElementById('ball');
let cursordiv = document.getElementById('cursor');

let ball = Ball(100,100,5,5, balldiv);
let cursor = Cursor(30);

const onMouseMove = (e) =>{
  cursordiv.style.left = e.pageX + 'px';
  cursordiv.style.top = e.pageY + 'px';
  cursor.setPos(e.pageX, e.pageY);
}
document.addEventListener('mousemove', onMouseMove);


function sqrdist(x1,y1,x2,y2){
    let val = (x1 - x2)*(x1 - x2);
    val += (y1 - y2)*(y1 - y2);
    return val;
}
function update() {
    //# called every timestep

    //# Calculate the x and y forces
    let x1 = cursor.posX;
    let y1 = cursor.posY;

    let x2 = ball.posX;
    let y2 = ball.posY;

    let dirX = x1 - x2;
    let dirY = y1 - y2;
    let sqrdistance = sqrdist(x1,y1,x2,y2)

    let forceX = gravity * (ball.mass * cursor.mass) * dirX / sqrdistance;
    let forceY = gravity * (ball.mass * cursor.mass) * dirY / sqrdistance;

    //# adjust the balls current velocity
    ball.adjustVelocity(forceX, forceY);

    //# move the ball according to it's velocity
    ball.move();
}

//# update loop in milliseconds
setInterval(update, timestep)






class Cursor{
    constructor(m) {
        this.mass = m;
        this.posX = 100;
        this.posY = 100;
    }
    setPos(x,y){
        this.posX = x;
        this.posY = y;
    }
}

class Ball{
    constructor(x,y,m, iv, d){
        this.posX = x;
        this.posY = y;
        this.mass = m;
        this.velocityX = iv;
        this.velocityY = 0;
        this.div = d;
    }
    applyVelocity(){
        this.posX += this.velocityX / timestep;
        this.posY += this.velocityY / timestep;
    }
    adjustVelocity(fx, fy){
        this.posX += fx;
        this.posY += fy;
    }
    move(){
        this.applyVelocity();
        cursordiv.style.left = this.posX + 'px';
        cursordiv.style.top = this.posY + 'px';
    }


}