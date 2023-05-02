
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameover = document.querySelector('.gameover');
const nuvens = document.querySelector('.nuvens');
const pontuacao = document.querySelector('#pontuacao');

let contadorPontuacao = 0;
let isPaused = false;

const updateScore = function(){

    if (!isPaused) {
        contadorPontuacao++;
        pontuacao.textContent = `Pontuação ${contadorPontuacao}`; 
    }
}

const restartButton = document.getElementById('restart-button');

restartButton.addEventListener('click', () => {
    location.reload();
});

const mapaTeclado = {
    p         : 'paused-button'
}


const mapearTeclado = (evento) => {
    const tecla = evento.key;
    
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}

const pausedButton = document.getElementById('paused-button');

pausedButton.addEventListener('click', () => {
  isPaused = !isPaused;
  pausedButton.blur();
  pipe.classList.toggle('paused');
  nuvens.classList.toggle('paused');
});



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

    } else { 
        updateScore();
        console.log(pipePosition, marioPosition);
    }

}, 10)


document.addEventListener('keydown', mapearTeclado);
document.addEventListener('keydown', jump); 