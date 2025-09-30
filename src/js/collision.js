function shrinkRect(rect, shrinkFactor = 0.8) {
  const width = rect.width * shrinkFactor;
  const height = rect.height * shrinkFactor;
  const x = rect.left + (rect.width - width) / 2;
  const y = rect.top + (rect.height - height) / 2;
  return {
    left: x,
    top: y,
    right: x + width,
    bottom: y + height
  };
}

function isColliding(rect1, rect2) {
  rect1 = shrinkRect(rect1, 0.8); // hitbox = 70%
  rect2 = shrinkRect(rect2, 0.8);

  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right ||
    rect1.right < rect2.left
  );
}

function checkCollisions() {
  if (!gameStarted) return;

  const player = document.getElementById("player");
  if (!player) return;

  const playerRect = player.getBoundingClientRect();

  // 🔹 Moedas
  coinsSpawnadas.forEach((coin, i) => {
    const coinRect = coin.el.getBoundingClientRect();
    if (isColliding(playerRect, coinRect)) {
      coinSound.play();
      coin.el.remove();
      coinsSpawnadas.splice(i, 1);

      // aumenta moedas do jogador
      moedasJogador++;
      moedasRun++;
      localStorage.setItem("moedas", moedasJogador);

      console.log("💰 Moeda coletada! Total:", moedasJogador);

      // (opcional) atualizar UI
      atualizarMoedasUI();
      atualizarMoedasRunUI();
      
    }
  });

  // 🔹 Gasolina
  gasSpawnadas.forEach((gas, i) => {
    const gasRect = gas.el.getBoundingClientRect();
    if (isColliding(playerRect, gasRect)) {
      gasSound.play();
      gas.el.remove();
      gasSpawnadas.splice(i, 1);
      console.log("⛽ Gasolina coletada!");
      // aqui aumenta combustível
      reabastecer(100);
    }
  });

  // 🔹 Carros
  carrosSpawnados.forEach((carro) => {
    const carroRect = carro.el.getBoundingClientRect();
    if (isColliding(playerRect, carroRect)) {
      console.log("💥 Colidiu com um carro!");
      gameOver();
    }
  });
}
