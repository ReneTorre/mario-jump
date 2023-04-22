
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameover = document.querySelector('.gameover');
const nuvens = document.querySelector('.nuvens');
const pontuacao = document.querySelector('#pontuacao');

let contadorPontuacao = 0;

const updateScore = function(){

        contadorPontuacao++;
        pontuacao.textContent = `Pontuação ${contadorPontuacao}`; 

}

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);

    

}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    
    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 85){

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './imagens/mariogameover.png';
        mario.style.width = '100px'
        mario.style.marginLeft = '50px'

        gameover.style.opacity = 1;

        nuvens.classList.add('paused');
        
        clearInterval(loop);
        
        contadorPontuacao = 0; 

    }else if (pipePosition > -20  && pipePosition <= 0 && marioPosition > 85){ 
        updateScore();
        console.log(pipePosition, marioPosition);
    }

}, 8)

document.addEventListener('keydown', jump);