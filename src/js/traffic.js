// @ts-nocheck
// inicializa caminho começando no meio
function inicializarCaminho() {
  caminhosLivresAtuais = [Math.ceil(numPistas / 2)];
}
// cria uma fileira de carros no topo
function spawnFileira() {
  if(gameStarted){
      linhaAtual++;
      // altura inicial da fileira (cada linha nasce mais acima que a anterior)
      let posY = -alturaCarro - (linhaAtual * 220); // 150px de espaço entre fileiras
      let novosLivres = new Set();

      // 🔹 Escolhe caminho principal
      let caminhoPrincipal = caminhosLivresAtuais[
        Math.floor(Math.random() * caminhosLivresAtuais.length)
      ];
      novosLivres.add(caminhoPrincipal);

      // 🔹 Chance de abrir para esquerda/direita
      if (caminhoPrincipal > 1 && Math.random() < 0.4) {
        novosLivres.add(caminhoPrincipal - 1);
      }
      if (caminhoPrincipal < numPistas && Math.random() < 0.4) {
        novosLivres.add(caminhoPrincipal + 1);
      }

      // 🔹 Chance de manter outros caminhos livres antigos
      caminhosLivresAtuais.forEach(caminho => {
        if (caminho !== caminhoPrincipal && Math.random() < 0.2) {
          novosLivres.add(caminho);
        }
      });

      // Atualiza para próxima rodada
      caminhosLivresAtuais = Array.from(novosLivres);

      // 🔹 Cria carros em todas as colunas exceto as livres
      for (let pista = 1; pista <= numPistas; pista++) {
        if (!novosLivres.has(pista)) {
          // 40% chance de aparecer carro.
          if(Math.random() < 0.4){
            let coluna = document.getElementById(`col-${pista}`);
            let numCar = Math.floor(Math.random() * 13) + 1;
            let carro = document.createElement("img");

            carro.src = `src/assets/images/TrafficCars/car${numCar}.png`;
            carro.alt = "TrafficCar";
            carro.classList.add("carroBaixo");
            carro.style.position = "absolute";
            carro.style.top = posY + "px"; // começa fora da tela
            coluna.appendChild(carro);
            carrosSpawnados.push({ col: pista, y: posY, el: carro, vel: 3 });
          }
        }
      }
      spawnItens(caminhosLivresAtuais, posY);
  }
}

// atualiza movimento dos carros
function updateCars(delta) {
  for (let c of carrosSpawnados) {
    // movimento baseado no tempo real
    c.y += c.vel * dificuldade * delta * 60; 
    c.el.style.top = c.y + "px";

    // remove se saiu da tela
    if (c.y > window.innerHeight) {
      c.el.remove();
    }
  }

  // limpa array de carros removidos
  carrosSpawnados = carrosSpawnados.filter(c => c.y <= window.innerHeight);
}


