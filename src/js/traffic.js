let road = document.getElementById("road");
let traffic = [];

// Configuração das pistas
let totalCols = 7;        // 7 colunas (2 laterais + 5 jogáveis)
let laneCount = 5;        // só as 5 do meio são faixas
let laneWidth = window.innerWidth / totalCols;
let lanes = [];

// calcular posição em X para cada faixa jogável
for (let i = 0; i < laneCount; i++) {
  let laneX = (i + 1) * laneWidth + laneWidth / 2; // colunas 2 até 6
  lanes.push(laneX);
}

// caminho livre garantido
let caminhosLivresAtuais = [Math.floor(laneCount / 2)]; // começa no meio

function criarCarro(laneX) {
  function criarCarro(laneX) {
  let car = document.createElement("div");
  car.classList.add("car");

  // sorteia tipo de veículo
  let num = Math.floor(Math.random() * 9) + 1;
  car.style.backgroundImage = `url("src/assets/images/trafficCars/car${num}.png")`;

  // tamanhos diferentes para veículos
  let sizes = [
    { w: 60, h: 100 },   // carro pequeno
    { w: 80, h: 140 },   // SUV
    { w: 100, h: 200 },  // caminhão
  ];
  let size = sizes[Math.floor(Math.random() * sizes.length)];
  car.style.width = size.w + "px";
  car.style.height = size.h + "px";

  // posição inicial
  car.style.left = (laneX - size.w / 2) + "px";
  car.style.top = -size.h + "px";

  // velocidade individual
  car.dataset.speed = (Math.random() * 2 + 1).toFixed(2); // entre 1 e 3

  road.appendChild(car);
  traffic.push(car);
}

}

function spawnCars() {
  let laneIndex = Math.floor(Math.random() * laneCount);
  criarCarro(lanes[laneIndex]);

  // próximo spawn em tempo aleatório
  let delay = Math.random() * 1000 + 500; // 0.5s ~ 1.5s
  setTimeout(spawnCars, delay);
}


function updateTraffic(baseVelocidade) {
  for (let i = traffic.length - 1; i >= 0; i--) {
    let car = traffic[i];
    let top = parseFloat(car.style.top);
    let v = baseVelocidade * parseFloat(car.dataset.speed);
    top += v;
    car.style.top = top + "px";

    if (top > window.innerHeight + 300) {
      car.remove();
      traffic.splice(i, 1);
    }
  }
}

