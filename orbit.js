//#region F = 10 * (mass1 * mass2) * vector direction / (vector magnitiude)

let timestep = 10; //# milliseconds
let gravity = 1;

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
    adjustVelocity(fx, fy){
        this.posX += (fx + this.velocityX) / timestep;
        this.posY += (fy + this.velocityY) / timestep;
    }
    move(){
        this.div.style.left = this.posX + 'px';
        this.div.style.top = this.posY + 'px';
    }


}

let balldiv = document.getElementById('ball');
//let cursordiv = document.getElementById('cursor');

let ball = new Ball(100,100,5,5, balldiv);
let cursor = new Cursor(30);

const onMouseMove = (e) =>{
  //cursordiv.style.left = e.pageX + 'px';
  //cursordiv.style.top = e.pageY + 'px';
  cursor.setPos(e.pageX, e.pageY);
}
document.addEventListener('mousemove', onMouseMove);

function update() {
    //# called every timestep

    //# Calculate the x and y forces
    x1 = cursor.posX;
    y1 = cursor.posY;

    x2 = ball.posX;
    y2 = ball.posY;

    dirX = x1 - x2;
    dirY = y1 - y2;
    sqrdistance = (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2);

    forceX = gravity * (ball.mass * cursor.mass) * dirX / sqrdistance;
    forceY = gravity * (ball.mass * cursor.mass) * dirY / sqrdistance;
    console.log("x1: " + x1);
    console.log("y1: " + y1);
    console.log("x2: " + x2);
    console.log("y2: " + y2);
    console.log("FX: " + forceX);
    console.log("FY: " + forceY);
    //# adjust the balls current velocity
    ball.adjustVelocity(forceX, forceY);

    //# move the ball according to it's velocity
    ball.move();
}

//# update loop in milliseconds
setInterval(update, timestep)






