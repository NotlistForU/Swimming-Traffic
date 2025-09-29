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
startTraffic();
criarPista(7);