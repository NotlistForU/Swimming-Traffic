let gameStarted = false;


let colunaAtual = 5; // começa na coluna do meio (1 a 5)
const AceleroSound = new Audio("src/assets/sounds/AcelerandoGTR.mp3");
AceleroSound.loop = true;
AceleroSound.volume = 1;
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
    player.style.top = playerY + "px";

    // garante que o player esteja sempre na coluna certa
    let col = document.getElementById(`col-${colunaAtual}`);
    if (!col.contains(player)) {
      col.appendChild(player);
    }

    window.scrollTo({
      top: playerY - window.innerHeight / 2,
      left: 0,
      behavior: "auto"
    });
  }
}

const angulo = 0;
let anguloAtual = 0;
let playerY = 57500; 
let colisao = false;
let velocidade = 2;

let movimento = setInterval(() => {
  if (!colisao) {
    playerY -= velocidade;
    updatePlayer();
  } else {
    clearInterval(movimento);
  }
}, 16);

let keysPressed = {};

document.addEventListener('keydown', function(event) {

  if(!gameStarted) return;
  keysPressed[event.key.toLowerCase()] = true;

  // troca de faixa (executa só uma vez por pressionamento)
  if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
    if (colunaAtual > 1) {
      colunaAtual--; 
      anguloAtual = -10;
    }
  } 
  else if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
    if (colunaAtual < 8) {
      colunaAtual++; 
      anguloAtual = 10;
    }
  }
});

document.addEventListener('keyup', function(event) {
  if (!gameStarted) return;
  keysPressed[event.key.toLowerCase()] = false;
    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
        // inicia fade-out suave
        fadeOutInterval = setInterval(() => {
          if (AceleroSound.volume > 0.05) {
            AceleroSound.volume -= 0.05; // reduz 5% do volume
          } else {
            clearInterval(fadeOutInterval);
            AceleroSound.pause();
            AceleroSound.currentTime = 0; // reinicia o som
            AceleroSound.volume = 1;
            motorSound.play().catch(err => console.log("Erro motor:", err));      // garante que na próxima vez começa cheio
          }
        }, 50); // a cada 50ms (0.05s)
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
  if (keysPressed['w'] || keysPressed['arrowup']) {
    playerY -= 100;
    motorSound.pause();
    AceleroSound.play();
  }
  if (keysPressed['s'] || keysPressed['arrowdown']) {
    playerY += 2;
  }

  updatePlayer();
}, 16); // ~60fps

