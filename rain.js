function rain(){
    let amount = 20;
    let body = document.querySelector('body');
    let i = 0;
    while(i < amount){
        let drop = document.createElement('raindrop');
        
        let size = Math.random() * 5;
        let posX = Math.floor(Math.random() * window.innerWidth);

        drop.style.width = size + 'px';
        drop.style.left = posX + 'px';
        body.appendChild(drop);
        i++
    }
}