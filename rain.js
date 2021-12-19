function rain(){
    let amount = 30;
    let body = document.querySelector('body');
    let i = 0;
    while(i < amount){
        let drop = document.createElement('raindrop');
        
        let size = Math.random() * 4;
        let posX = Math.floor(Math.random() * window.innerWidth);

        let delay = Math.random() * -20;
        let duration = Math.random() * 5;

        drop.style.width = 0.5 + size + 'px';
        drop.style.left = posX + 'px';
        drop.style.animationDelay = delay + 's';
        drop.style.animationDuration = 1 + duration + 's';
        body.appendChild(drop);
        i++
    }
}
rain();