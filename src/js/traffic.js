let carrosSpawnados = [];
const alturaCarro = 140; // altura do sprite
const larguraPista = 200; // largura de cada coluna
const numPistas = 8;

let caminhosLivresAtuais = [];

// inicializa caminho começando no meio
function inicializarCaminho() {
  caminhosLivresAtuais = [Math.ceil(numPistas / 2)];
}
let linhaAtual = 0;
// cria uma fileira de carros no topo
function spawnFileira() {
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
        let numCar = Math.floor(Math.random() * 9) + 1;
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
  spawnCoins(caminhosLivresAtuais, posY);
}

// atualiza movimento dos carros
function updateCars() {
  for (let c of carrosSpawnados) {
    c.y += c.vel;
    c.el.style.top = c.y + "px";

    // remove se saiu da tela
    if (c.y > window.innerHeight) {
      c.el.remove();
    }
  }

  // limpa array de carros removidos
  carrosSpawnados = carrosSpawnados.filter(c => c.y <= window.innerHeight);
}

// loop principal
function startTraffic() {
  inicializarCaminho();

  setInterval(() => {
    spawnFileira();
  }, 1000); // a cada 1s cria uma nova fileira

  setInterval(() => {
    updateCars();
    updateCoins();
  }, 16); // ~60fps
}

startTraffic();
