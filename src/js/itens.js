function spawnItens(novosLivres, posY) {
  novosLivres.forEach(pista => {
    // chance de spawnar algum item
    if (Math.random() < 0.8) {
      let coluna = document.getElementById(`col-${pista}`);
      let sorteio = Math.random();

      if (sorteio < 0.7) {
        // 70% coin
        let coin = document.createElement("img");
        coin.src = "src/assets/images/Coins/coin1.png";
        coin.alt = "Coin";
        coin.classList.add("coins");
        coin.style.position = "absolute";
        coin.style.top = posY + "px";
        coluna.appendChild(coin);

        coinsSpawnadas.push({
          col: pista,
          y: posY,
          el: coin,
          vel: 3,
          frame: 0,
          frameTimer: 0,
          floatOffset: 0,
          floatDir: 1
        });
      } else if (sorteio < 1) {
        // 10% gas
        let gas = document.createElement("img");
        gas.src = "src/assets/images/Gas/gas1.png";
        gas.alt = "Gas";
        gas.classList.add("gas");
        gas.style.position = "absolute";
        gas.style.top = posY + "px";
        coluna.appendChild(gas);

        gasSpawnadas.push({
          col: pista,
          y: posY,
          el: gas,
          vel: 3,
          frame: 0,
          frameTimer: 0,
          floatOffset: 0,
          floatDir: 1
        });
      }
    }
  });
}