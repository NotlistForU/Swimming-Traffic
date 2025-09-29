
let gameStarted = false;


let colunaAtual = 5; // começa na coluna do meio (1 a 5)
const AceleroSound = new Audio("src/assets/sounds/AcelerandoGTR.mp3");
AceleroSound.loop = true;
AceleroSound.volume = 0.3;
const motorSound = new Audio("src/assets/sounds/naManhaBMW3.mp3");
motorSound.loop = true;
motorSound.volume = 0.3;



function creatPlayer(numPista) {
  colunaAtual = numPista; // define onde vai nascer
  let col = document.getElementById(`col-${colunaAtual}`);
  const player = document.createElement("img");
  player.src = `src/assets/images/PlayerCars/car3.png`;
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
    atualizarScore()
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
    }, 1000);
  }

  // troca de faixa (executa só uma vez por pressionamento)
  if (event.key === 'a'|| event.key === 'A'|| event.key === 'ArrowLeft') {
    if (colunaAtual > 1) {
      colunaAtual--; 
      anguloAtual = -5;
    }
  } 
  else if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
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


function gameOver() {
  gameStarted = false;
  motorSound.pause();
  motorSound.currentTime = 0;
  AceleroSound.pause();
  AceleroSound.currentTime = 0;

  // 🔹 Mostra o menu de novo
  menu.style.display = "flex";

  // 🔹 Remove o player e carros da tela
  const player = document.getElementById("player");
  if (player) {
    player.remove();
  }
  carrosSpawnados.forEach(c => c.el.remove());
  carrosSpawnados = [];

  // Se tiver moedas/gasolina, limpa também
  coinsSpawnadas.forEach(m => m.el.remove());
  coinsSpawnadas = [];
  gasSpawnadas.forEach(g => g.el.remove());
  gasSpawnadas = [];

  // 🔹 (Opcional) resetar variáveis de jogo
  linhaAtual = 0;
  caminhosLivresAtuais = [];
  hud.classList.remove("flex");
  hud.classList.add("hidden");
  anguloAtual = 0;
  salvarPontuacao(kmPercorridos, tempoVivo);
  mostrarRanking();
  currentFuel = maxFuel;
  velocidadeKmH = 60;
  dificuldade = 1;
  clearInterval(dificuldadeTimer);
  dificuldadeTimer = null;
  atualizarVelocimetro();
  atualizarVelocidadeFaixa();
}

function resetGame() {
  // zera arrays
  carrosSpawnados = [];
  coinsSpawnadas = [];
  gasSpawnadas = [];

  // zera variáveis
  linhaAtual = 0;
  caminhosLivresAtuais = [];

  // garante que o caminho inicial existe
  inicializarCaminho();
}
