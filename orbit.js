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
        this.div.style.width = m*m + "px";
        this.div.style.height = m*m + "px";
    }
    adjustVelocity(fx, fy){
        this.velocityX += fx;
        this.velocityY += fy;
        this.posX += this.velocityX / timestep;
        this.posY += this.velocityY / timestep;
    }
    move(){
        this.div.style.left = this.posX + 'px';
        this.div.style.top = this.posY + 'px';
    }


}

let balldiv1 = document.getElementById('ball1');
let balldiv2 = document.getElementById('ball2');
let balldiv3 = document.getElementById('ball3');
//let cursordiv = document.getElementById('cursor');

let ball1 = new Ball(100,100,5,5, balldiv1);
let ball2 = new Ball(100,200,8,10, balldiv2);
let ball3 = new Ball(100,300,12,15, balldiv3);
let cursor = new Cursor(40);

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

    x2 = ball1.posX;
    y2 = ball1.posY;

    dirX = x1 - x2;
    dirY = y1 - y2;
    sqrdistance = (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2);

    forceX = gravity * (ball1.mass * cursor.mass) * dirX / sqrdistance;
    forceY = gravity * (ball1.mass * cursor.mass) * dirY / sqrdistance;
    //# adjust the balls current velocity
    ball1.adjustVelocity(forceX, forceY);

    //# move the ball according to it's velocity
    ball1.move();

    //# Calculate the x and y forces

    x2 = ball2.posX;
    y2 = ball2.posY;

    dirX = x1 - x2;
    dirY = y1 - y2;
    sqrdistance = (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2);

    forceX = gravity * (ball2.mass * cursor.mass) * dirX / sqrdistance;
    forceY = gravity * (ball2.mass * cursor.mass) * dirY / sqrdistance;
    //# adjust the balls current velocity
    ball2.adjustVelocity(forceX, forceY);

    //# move the ball according to it's velocity
    ball2.move();

    //# Calculate the x and y forces

    x2 = ball3.posX;
    y2 = ball3.posY;

    dirX = x1 - x2;
    dirY = y1 - y2;
    sqrdistance = (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2);

    forceX = gravity * (ball3.mass * cursor.mass) * dirX / sqrdistance;
    forceY = gravity * (ball3.mass * cursor.mass) * dirY / sqrdistance;
    //# adjust the balls current velocity
    ball3.adjustVelocity(forceX, forceY);

    //# move the ball according to it's velocity
    ball3.move();
}

//# update loop in milliseconds
setInterval(update, timestep)






