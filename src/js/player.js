
// @ts-nocheck
let gameStarted = false;


let colunaAtual = 5; // começa na coluna do meio (1 a 5)
function creatPlayer(numPista) {
  colunaAtual = numPista;
  let col = document.getElementById(`col-${colunaAtual}`);

  // pega carro selecionado
  const carroId = localStorage.getItem("carroSelecionado") || 1;
  const carro = carros.find(c => c.id == carroId);

  // cria imagem do player
  const player = document.createElement("img");
  player.src = `src/assets/images/PlayerCars/${carro.prefix}.png`;
  player.alt = "player";
  player.classList.add("player");
  player.id = "player";
  col.appendChild(player);
  atualizarVisibilidade(gameMode);

  // cria som do motor
  motorSound = new Audio(`src/assets/sounds/${carro.prefix}-${carro.id}-${carro.id}.mp3`);
  motorSound.loop = true;
  motorSound.volume = vol;
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
let gameMode = "normal";
document.addEventListener('keydown', function(event) {
  if (!gameStarted) return;
  if (!gameStarted || gamePaused) return; // 🚫 ignora teclas se pausado

  // if(!gameStarted) return;
  // keysPressed[event.key.toLowerCase()] = true;
  // if(event.key === 'w'){
  //   acelerarTimner = setInterval(()=>{
  //     acelerando = true;
  //   }, 1000);
  // }

  // troca de faixa (executa só uma vez por pressionamento)
  if (event.key === 'a'|| event.key === 'A'|| event.key === 'ArrowLeft') {
    if (colunaAtual > 1) {
      colunaAtual--; 
      anguloAtual = -5;
      atualizarVisibilidade(gameMode);
    }
  } 
  else if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
    if (colunaAtual < numPistas) {
      colunaAtual++; 
      anguloAtual = 5;
      atualizarVisibilidade(gameMode);
    }
  }
});





document.addEventListener('keyup', function(event) {
  if (!gameStarted) return;
  if (!gameStarted || gamePaused) return; // 🚫 ignora teclas se pausado
  keysPressed[event.key.toLowerCase()] = false;
  // if (event.key === 'w' || event.key === 'W'|| event.key === 'ArrowUp') {
  //   acelerando = false;
  //   console.log(acelerando);
  //   AceleroSound.pause();
  //   AceleroSound.currentTime = 0;
    
  //   motorSound.play().catch(err => console.log("Erro motor:", err));
  // }

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


function atualizarVisibilidade(gameMode) {
  if (gameMode !== "nevoa") {
    // modo normal → remove nevoa de todas
    for (let i = 1; i <= numPistas; i++) {
      document.getElementById(`col-${i}`).classList.remove("nevoa");
    }
    return;
  }

  // modo nevoa → só a coluna atual fica clara
  for (let i = 1; i <= numPistas; i++) {
    const col = document.getElementById(`col-${i}`);
    if (i === colunaAtual) {
      col.classList.remove("nevoa");
    } else {
      col.classList.add("nevoa");
    }
  }
}

const telaGameOver = document.getElementById("gameOver");
const kmFinal = document.getElementById("kmFinal");
const moedasFinal = document.getElementById("moedasFinal");


function mostrarGameOver(){
  kmFinal.textContent = kmPercorridos.toFixed(1);
  moedasFinal.textContent = moedasRun;
  mostrar(telaGameOver);
}


function gameOver() {
  gameStarted = false;
  motorSound.pause();
  motorSound.currentTime = 0;
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
  anguloAtual = 0;
  salvarPontuacao(kmPercorridos, tempoVivo);
  mostrarRanking();
  currentFuel = maxFuel;
  velocidadeKmH = 60;
  dificuldade = 1;
  // 🔹 limpa timers
  clearInterval(dificuldadeTimer);
  dificuldadeTimer = null;
  clearInterval(spawnTimer);
  spawnTimer = null;
  atualizarVelocimetro();
  atualizarVelocidadeFaixa();
  mostrarGameOver();
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
