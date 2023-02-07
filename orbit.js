//#region F = 10 * (mass1 * mass2) * vector direction / (vector magnitiude)
let timestep = 40; //# milliseconds
let gravity = 3;
let distscale = 5;

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
    constructor(x,y,m, iv, d,id){
        this.posX = x;
        this.posY = y;
        this.mass = m;
        this.velocityX = iv;
        this.velocityY = 0;
        this.div = d;
        this.div.style.width = ((m*2)+1) + "px";
        this.div.style.height = ((m*2)+1) + "px";
        this.radius = this.mass + 3;
        this.active = true;
        this.id = id;
    }
    adjustVelocity(c){
        let x1 = c.posX;
        let y1 = c.posY;

        let x2 = this.posX;
        let y2 = this.posY;

        let dirX = x1 - x2;
        let dirY = y1 - y2;
        let sqrdistance = (dirX)*(dirX) + (dirY)*(dirY);

        let forceX = gravity * (this.mass * c.mass) * dirX / (sqrdistance * distscale);
        let forceY = gravity * (this.mass * c.mass) * dirY / (sqrdistance * distscale);
        let fx = forceX;
        let fy = forceY;

        if (this.posX <= this.radius && this.velocityX < 0){
            this.velocityX *= -0.4;
        }
        if (this.posX >= document.documentElement.clientWidth-this.radius && this.velocityX > 0){
            this.velocityX *= -0.4;
        }
        if (this.posY <= this.radius && this.velocityY < 0){
            this.velocityY *= -0.4;
        }
        if (this.posY >= document.body.clientHeight-this.radius && this.velocityY > 0){
            this.velocityY *= -0.4;
        }
        this.velocityX += fx;
        this.velocityY += fy;
        if (this.velocityX >= 500){
            this.velocityX = 500;
        } else if (this.velocityX <= -500){
            this.velocityX = -500;
        }
        if (this.velocityY >= 500){
            this.velocityY = 500;
        }else if (this.velocityY <= -500){
            this.velocityY = -500;
        }
        
        
        this.posX += this.velocityX / timestep;
        this.posY += this.velocityY / timestep;
    }
    move(cr){
        if (this.active){
            this.velocityX *= 1 - (0.05 / timestep);
            this.velocityY *= 1 - (0.05 / timestep);
            this.adjustVelocity(cr)
            this.div.style.left = this.posX + 'px';
            this.div.style.top = this.posY + 'px';
        }
    }
    disable(){
        if (this.active){
            this.active = false;
            this.div.parentNode.removeChild(this.div);
        }
    }


}

let balldiv1 = document.getElementById('ball1');
let balldiv2 = document.getElementById('ball2');
let balldiv3 = document.getElementById('ball3');
//let cursordiv = document.getElementById('cursor');

let ball1 = new Ball(Math.random() * document.documentElement.clientWidth, Math.random() * document.body.clientHeight,Math.random()*10+5,Math.random() * 75 + 10, balldiv1,'ball1');
let ball2 = new Ball(Math.random() * document.documentElement.clientWidth, Math.random() * document.body.clientHeight,Math.random()*5+5,Math.random() * 75 + 10, balldiv2,'ball2');
let ball3 = new Ball(Math.random() * document.documentElement.clientWidth, Math.random() * document.body.clientHeight,Math.random()*1+5,Math.random() * 75 + 10, balldiv3,'ball3');

let cursor = new Cursor(300);

const onMouseMove = (e) =>{
  //cursordiv.style.left = e.pageX + 'px';
  //cursordiv.style.top = e.pageY + 'px';
  cursor.setPos(e.pageX, e.pageY);
}
document.addEventListener('mousemove', onMouseMove);
function checkBallCollisions(b1, b2){
    let r1 = b1.radius;
    let r2 = b2.radius;

    let sqrdist = (b1.posX - b2.posX)*(b1.posX - b2.posX) + (b1.posY - b2.posY)*(b1.posY - b2.posY);

    if (sqrdist < (r1+r2)*(r1+r2)){
        // ball 1 and 2 bounce
        
        let M = b1.mass + b2.mass;
        let dot1 = (b1.velocityX - b2.velocityX) * (b1.posX - b2.posX) + (b1.velocityY - b2.velocityY) * (b1.posY - b2.posY);
        let dot2 = (b2.velocityX - b1.velocityX) * (b2.posX - b1.posX) + (b2.velocityY - b1.velocityY) * (b2.posY - b1.posY);

        let d1 = (b1.posX - b2.posX)*(b1.posX - b2.posX) + (b1.posY - b2.posY)*(b1.posY - b2.posY)
        let d2 = (b2.posX - b1.posX)*(b2.posX - b1.posX) + (b2.posY - b1.posY)*(b2.posY - b1.posY)

        let x1 = b1.velocityX - (2*b2.mass / M) * dot1 / d1 * (b1.posX - b2.posX);
        let y1 = b1.velocityY - (2*b2.mass / M) * dot1 / d1 * (b1.posY - b2.posY);
        let x2 = b2.velocityX - (2*b1.mass / M) * dot2 / d2 * (b2.posX - b1.posX);
        let y2 = b2.velocityY - (2*b1.mass / M) * dot2 / d2 * (b2.posY - b1.posY);

        b1.velocityX = x1;
        b1.velocityY = y1;
        b2.velocityX = x2;
        b2.velocityY = y2;
    }
}
function update() {
    if (ball1.active){
        ball1.move(cursor);
    }
    if (ball2.active){
        ball2.move(cursor);
    }
    if (ball3.active){
        ball3.move(cursor);
    }
    checkBallCollisions(ball1, ball2);
    checkBallCollisions(ball1, ball3);
    checkBallCollisions(ball2, ball3);
}


//# update loop in milliseconds
setInterval(update, timestep)