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




let spawnInterval = 1; // segundos
let spawnTimer = 0;
let dificuldadeTimer = 0;
let difIntervalo = 0;
let dificuldade = 1;
let dificuldadeIntervalo = 10;
let lastTime = 0;
let velocidadeBase = 60; // velocidade inicial padrão
let velocidadeMultiplicador = 1; // varia por carro

function gameLoop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  if (!gameStarted) {
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


// Inicia o loop
requestAnimationFrame(gameLoop);

criarPista(7);
