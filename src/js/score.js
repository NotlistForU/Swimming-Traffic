function salvarPontuacao(km, tempo, moedas) {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.push({ km, tempo, moedas });

  // ordena: maior km primeiro, em empate menor tempo
  ranking.sort((a, b) => {
    if (b.km !== a.km) return b.km - a.km;
    return a.tempo - b.tempo;
  });

  // mantém só os 10 melhores
  ranking = ranking.slice(0, 10);

  localStorage.setItem("ranking", JSON.stringify(ranking));
}

function mostrarRanking() {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  let lista = document.getElementById("rankingList");

  lista.innerHTML = "";

  ranking.forEach((item, i) => {
    let li = document.createElement("li");
    li.textContent = `${i + 1}º - ${item.km.toFixed(2)} km | ${item.tempo.toFixed(1)}s`;
    lista.appendChild(li);
  });
}

function atualizarMoedasUI() {
  const h3 = document.querySelector("#moedasDisplay h3");
  if (h3) {
    h3.textContent = "Moedas: " + moedasJogador + " 🪙";
  }
}

function resetarMoedas() {
  moedasJogador = 0;
  moedasRun = 0;
  localStorage.setItem("moedas", moedasJogador);
  atualizarMoedasUI();
  atualizarMoedasRunUI();
  console.log("💰 Moedas resetadas!");
}

function atualizarMoedasRunUI() {
  document.getElementById("coinsDisplay").textContent = "💰 " + moedasRun;
}

// SCORE DO RANKING  ==================

let startTime = 0;       // quando a run começou
let tempoVivo = 0;       // em segundos
let kmPercorridos = 0;   // distância acumulada
let velocidadeKmH = 60;  // velocidade base

function atualizarScore(delta) {
  if (!gameStarted) return;

  // acumula tempo vivo
  tempoVivo += delta;

  // distância percorrida em km
  kmPercorridos += (velocidadeKmH / 3600) * delta;
console.log("delta:", delta, "tempoVivo:", tempoVivo, "km:", kmPercorridos, "vel:", velocidadeKmH);
  atualizarScoreUI();
}

function atualizarScoreUI() {
  document.getElementById("pointsDisplay").innerHTML =
    `<div>🏆 ${kmPercorridos.toFixed(2)} km</div>
     <div>⏱ ${tempoVivo.toFixed(1)}s</div>`;
}

// Combustível ==================
let fuelBar = document.getElementById("fuelBar");
let maxFuel = 30;       // litros
let currentFuel = maxFuel;
let kmL = 0.03;           // km por litro

function updateFuelBar(delta) {
  // velocidade em km/s
  let velocidadeKmS = velocidadeKmH / 3600;

  // distância percorrida nesse frame (em km)
  let distanciaPercorridaKm = velocidadeKmS * delta;

  // consumo em litros
  let consumoLitros = distanciaPercorridaKm / kmL;
  currentFuel -= consumoLitros;
  currentFuel = Math.max(0, currentFuel);

  // calcula porcentagem
  let fuelPercent = (currentFuel / maxFuel) * 100;
  fuelBar.style.height = fuelPercent + "%";

  // cores
  if (fuelPercent > 50) {
    fuelBar.style.background = "linear-gradient(to top, #28a745, #6fdc6f)";
  } else if (fuelPercent > 20) {
    fuelBar.style.background = "linear-gradient(to top, #ffc107, #ffe066)";
  } else {
    fuelBar.style.background = "linear-gradient(to top, #dc3545, #ff6f6f)";
  }

  if (currentFuel <= 0) {
    gameOver();
  }
}

function reabastecer(qtd) {
  let g = qtd * 10; // cada qtd = 10 litros
  currentFuel = Math.min(maxFuel, currentFuel + g);
}
