// @ts-nocheck
document.addEventListener('keydown', function (event) {
  if ((event.ctrlKey || event.metaKey) && 
      (event.key === '+' || event.key === '-' || event.key === '=')) {
    event.preventDefault();
  }
});

document.addEventListener('wheel', function (event) {
  if (event.ctrlKey) {
    event.preventDefault();
  }
}, { passive: false });



// escuta a tecla P
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "p") {
    if(!gameStarted) return;
    gamePaused = !gamePaused; // alterna entre true/false
    if (gamePaused) {
      // jogo pausado → mostra overlay
      pause.classList.add("flex");
      pause.classList.remove("hidden");
      motorSound.pause();
      motorSound.currentTime = 0;
    } else {
      // jogo retomado → esconde overlay
      pause.classList.remove("flex");
      pause.classList.add("hidden");  
      motorSound.play();
    }

    console.log(gamePaused ? "Jogo pausado" : "Jogo retomado");
  }
});

let lastTime = 0;

function gameLoop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  if (!gameStarted || gamePaused) {
    requestAnimationFrame(gameLoop);
    return;
  }
  

  // Atualizações
  atualizarScore(delta);  
  updateFuelBar(delta);      
  updatePlayer();
  checkCollisions();
  updateCars(delta);
  updateCoins(delta);
  updateGas(delta);

  // Spawn
  spawnTimer += delta;
  if (spawnTimer >= spawnInterval) {
    spawnFileira();
    spawnTimer = 0;
  }

  // Dificuldade
  dificuldadeTimer += delta;
  if (dificuldadeTimer >= dificuldadeIntervalo) {
    const carroId = parseInt(localStorage.getItem("carroSelecionado")) || 1;

    if (carroId === 1) {
      dificuldade += 0.3;
      difIntervalo = 0.1;
      dificuldadeIntervalo = 12; // demora mais pra aumentar
      velocidadeMultiplicador = 1.0;
    } else if (carroId === 2) {
      dificuldade += 0.4;
      difIntervalo = 0.2;
      dificuldadeIntervalo = 9;
      velocidadeMultiplicador = 1.2;
    } else if (carroId === 3) {
      dificuldade += 0.6;
      difIntervalo = 0.2;
      dificuldadeIntervalo = 8;
      velocidadeMultiplicador = 1.4;
    } else if (carroId === 4) {
      dificuldade += 0.7;
      difIntervalo = 0.3;
      dificuldadeIntervalo = 7;
      velocidadeMultiplicador = 1.6;
    } else if (carroId === 5) {
      dificuldade += 1;
      difIntervalo = 0.4;
      dificuldadeIntervalo = 5; // aumenta dificuldade bem rápido
      velocidadeMultiplicador = 2.0;
    } else {
      dificuldade += 0.5;
      difIntervalo = 0.2;
      dificuldadeIntervalo = 10;
      velocidadeMultiplicador = 1.0;
    }

    atualizarVelocimetro();
    atualizarVelocidadeFaixa();

    spawnInterval = Math.max(0.5, spawnInterval - difIntervalo);
    dificuldadeTimer = 0;

    console.log("Dificuldade:", dificuldade);
  }
  requestAnimationFrame(gameLoop);
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



// Inicia o loop
requestAnimationFrame(gameLoop);

criarPista(7);
