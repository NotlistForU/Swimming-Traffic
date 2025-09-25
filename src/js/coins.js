let coinsSpawnadas = [];
const alturaCoin = 60; // altura da imagem da moeda

function spawnCoins(novosLivres, posY) {
  novosLivres.forEach(pista => {
    // chance de aparecer coin no caminho livre
    if (Math.random() < 0.8) { // 80% de chance
      let coluna = document.getElementById(`col-${pista}`);
      let coin = document.createElement("img");

      coin.src = "src/assets/images/Coins/coin1.png";
      coin.alt = "Coin";
      coin.classList.add("coins");
      coin.style.position = "absolute";
      coin.style.top = posY + "px";

      coluna.appendChild(coin);

      coinsSpawnadas.push({ col: pista, y: posY, el: coin, vel: 3 });
    }
  });
}

function updateCoins() {
  for (let c of coinsSpawnadas) {
    c.y += c.vel;
    c.el.style.top = c.y + "px";

    if (c.y > window.innerHeight) {
      c.el.remove();
    }
  }

  coinsSpawnadas = coinsSpawnadas.filter(c => c.y <= window.innerHeight);
}
