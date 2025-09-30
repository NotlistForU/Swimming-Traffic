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
let dificuldade = 1;
let lastTime = 0;

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
    if (dificuldadeTimer >= 10) {
      const carroId = parseInt(localStorage.getItem("carroSelecionado")) || 1;

      if (carroId === 1) { // Golf GTI
        dificuldade += 0.2;
      } else if (carroId === 3) { // Supra
        dificuldade += 0.3;
      } else if (carroId === 5) { // Ferrari
        dificuldade += 0.8;
      } else {
        dificuldade += 0.5; // padrão para os outros
      }
    velocidadeKmH += 10;
    atualizarVelocimetro();
    atualizarVelocidadeFaixa();

    spawnInterval = Math.max(0.5, spawnInterval - 0.1);
    dificuldadeTimer = 0;

    console.log("Dificuldade:", dificuldade);
  }

  requestAnimationFrame(gameLoop);
}


// Inicia o loop
requestAnimationFrame(gameLoop);

criarPista(7);
