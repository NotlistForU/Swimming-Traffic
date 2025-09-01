let lastSpawn = 0;

function gameLoop(timestamp) {
  updatePlayer();

  // mover estrada
    road.style.backgroundPositionY = (parseFloat(road.style.backgroundPositionY) || 0) + (speed + accel) + "px";
    // spawna "onda" de carros a cada 1s com caminho livre
    
    spawnCars();


  // atualizar carros
  updateTraffic(speed + accel);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
