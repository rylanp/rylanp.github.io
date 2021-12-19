//#region F = 10 * (mass1 * mass2) * vector direction / (vector magnitiude)

let timestep = 40; //# milliseconds
let gravity = 3;
let distscale = 100;
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
        this.div.style.width = ((m*2)+1) + "px";
        this.div.style.height = ((m*2)+1) + "px";
        this.radius = this.mass + 3;
    }
    adjustVelocity(c){
        let x1 = c.posX;
        let y1 = c.posY;

        let x2 = this.posX;
        let y2 = this.posY;

        let dirX = x1 - x2;
        let dirY = y1 - y2;
        let sqrdistance = (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2);

        let forceX = gravity * (this.mass * c.mass) * dirX / (sqrdistance * distscale);
        let forceY = gravity * (this.mass * c.mass) * dirY / (sqrdistance * distscale);
        let fx = forceX;
        let fy = forceY;

        if (this.posX <= this.radius && this.velocityX < 0){
            this.velocityX *= -0.4;
        }
        if (this.posX >= window.innerWidth && this.velocityX > 0){
            this.velocityX *= -0.4;
        }
        if (this.posY <= this.radius && this.velocityY < 0){
            this.velocityY *= -0.4;
        }
        if (this.posY >= window.height - this.radius && this.velocityY > 0){
            this.velocityY *= -0.4;
        }
        this.velocityX += fx;
        this.velocityY += fy;
        this.posX += this.velocityX / timestep;
        this.posY += this.velocityY / timestep;
    }
    move(cr){
        this.velocityX *= 1 - (0.05 / timestep);
        this.velocityY *= 1 - (0.05 / timestep);
        this.adjustVelocity(cr)
        this.div.style.left = this.posX + 'px';
        this.div.style.top = this.posY + 'px';
    }


}

let balldiv1 = document.getElementById('ball1');
let balldiv2 = document.getElementById('ball2');
let balldiv3 = document.getElementById('ball3');
let balldiv4 = document.getElementById('ball4');
let balldiv5 = document.getElementById('ball5');
//let cursordiv = document.getElementById('cursor');

let ball1 = new Ball(300,200,100,100, balldiv1);
let ball2 = new Ball(100,200,100,10, balldiv2);
let ball3 = new Ball(50,200,100,50, balldiv3);
let ball4 = new Ball(150,200,100,30, balldiv4);
let ball5 = new Ball(200,200,100,20, balldiv5);

let cursor = new Cursor(200);

const onMouseMove = (e) =>{
  //cursordiv.style.left = e.pageX + 'px';
  //cursordiv.style.top = e.pageY + 'px';
  cursor.setPos(e.pageX, e.pageY);
}
document.addEventListener('mousemove', onMouseMove);

function update() {
    ball1.move(cursor);
    ball2.move(cursor);
    ball3.move(cursor);
    ball4.move(cursor);
    ball5.move(cursor);
}

//# update loop in milliseconds
setInterval(update, timestep)






