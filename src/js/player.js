
let gameStarted = false;


let colunaAtual = 5; // começa na coluna do meio (1 a 5)
const AceleroSound = new Audio("src/assets/sounds/AcelerandoGTR.mp3");
AceleroSound.loop = true;
AceleroSound.volume = 0.3;
const motorSound = new Audio("src/assets/sounds/NaManhaGTR.mp3");
motorSound.loop = true;
motorSound.volume = 0.3;



function creatPlayer(numPista) {
  colunaAtual = numPista; // define onde vai nascer
  let col = document.getElementById(`col-${colunaAtual}`);
  const player = document.createElement("img");
  player.src = `src/assets/images/PlayerCars/car7.png`;
  player.alt = "player";
  player.classList.add("player");
  player.id = "player";
  col.appendChild(player);
  motorSound.play().catch(err => console.log("Erro motor:", err));

}

function updatePlayer() {
  const player = document.getElementById("player");
  if (player) {
    player.style.transform = `rotate(${anguloAtual}deg)`;

    // garante que o player esteja sempre na coluna certa
    let col = document.getElementById(`col-${colunaAtual}`);
    if (!col.contains(player)) {
      col.appendChild(player);
    }
  }
}

const angulo = 0;
let anguloAtual = 0;
let colisao = false;
let velocidade = 2;




let keysPressed = {};

let acelerarTimner = null;
let acelerando = false;

document.addEventListener('keydown', function(event) {

  if(!gameStarted) return;
  keysPressed[event.key.toLowerCase()] = true;
  if(event.key === 'w'){
    acelerarTimner = setInterval(()=>{
      acelerando = true;
    }, 2000);
  }

  // troca de faixa (executa só uma vez por pressionamento)
  if (event.key === 'a'||  event.key === 'ArrowLeft') {
    if (colunaAtual > 1) {
      colunaAtual--; 
      anguloAtual = -5;
    }
  } 
  else if (event.key === 'd' || event.key === 'ArrowRight') {
    if (colunaAtual < 8) {
      colunaAtual++; 
      anguloAtual = 5;
    }
  }
});

document.addEventListener('keyup', function(event) {
  if (!gameStarted) return;
  keysPressed[event.key.toLowerCase()] = false;
  if (event.key === 'w' || event.key === 'W'|| event.key === 'ArrowUp') {
    acelerando = false;
    console.log(acelerando);
    AceleroSound.pause();
    AceleroSound.currentTime = 0;
    
    motorSound.play().catch(err => console.log("Erro motor:", err));
  }

  if (
    event.key === 'A' || event.key === 'a' || event.key === 'ArrowLeft' ||
    event.key === 'D' || event.key === 'd' || event.key === 'ArrowRight'
  ) {
    setTimeout(() => {
      anguloAtual = 0;
      updatePlayer();
    }, 100);
  }
});




// loop contínuo
setInterval(() => {
  if (!gameStarted) return;
  if ((keysPressed['w'] || keysPressed['arrowup']) && acelerando) {
    motorSound.pause();
    motorSound.currentTime = 0;
    AceleroSound.play();
  }
  if (keysPressed['s'] || keysPressed['arrowdown']) {
  }

  updatePlayer();
  checkCollisions();
}, 16); // ~60fps

