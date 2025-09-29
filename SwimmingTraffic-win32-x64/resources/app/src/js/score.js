function salvarPontuacao(km, tempo) {
  // pega ranking atual ou cria vazio
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  // adiciona nova pontuação como objeto
  ranking.push({ km: km, tempo: tempo });

  // ordena do maior km para o menor
  ranking.sort((a, b) => b.km - a.km);

  // mantém só os 5 melhores
  ranking = ranking.slice(0, 10);

  // salva de volta no localStorage
  localStorage.setItem("ranking", JSON.stringify(ranking));
}


function mostrarRanking() {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  let lista = document.getElementById("rankingList");

  lista.innerHTML = ""; // limpa antes de preencher

  ranking.forEach((item, i) => {
    let li = document.createElement("li");
    li.textContent = `${i + 1}º - ${item.km.toFixed(2)} km | ${item.tempo.toFixed(1)}s`;
    lista.appendChild(li);
  });
}

function atualizarMoedasUI() {
  const h3 = document.querySelector("#moedasDisplay h3");
  if (h3) {
    h3.textContent = "Moedas: " + moedasJogador + "🪙";
  }
}

function resetarMoedas() {
  moedasJogador = 0;
  localStorage.setItem("moedas", moedasJogador);
  atualizarMoedasUI(); // atualiza a interface
  console.log("💰 Moedas resetadas!");
}


// SCORE DA RUN ==================
function atualizarMoedasRunUI() {
  document.getElementById("coinsDisplay").textContent = "💰 " + moedasRun;
}
// SCORE DO RANKING  ==================

let startTime = 0;       // quando a run começou
let tempoVivo = 0;       // em segundos
let kmPercorridos = 0;   // distância acumulada
let velocidadeKmH = 60;  // velocidade base (pode ser ligada ao velocímetro)


function atualizarScore() {
  if (!gameStarted) return;

  // tempo vivo em segundos
  tempoVivo = (Date.now() - startTime) / 1000;

  // distância percorrida em km
  kmPercorridos = (tempoVivo / 3600) * velocidadeKmH;

  atualizarScoreUI();
  updateFuelBar();
}

function atualizarScoreUI() {
   document.getElementById("pointsDisplay").innerHTML =
    `<div>🏆 ${kmPercorridos.toFixed(2)} km</div>
     <div>⏱ ${tempoVivo.toFixed(1)}s</div>`;
}


let fuelBar = document.getElementById("fuelBar");
// valor máximo de combustível (100%)
let maxFuel = 30/100;
// combustível atual (começa cheio)
let currentFuel = maxFuel;

// define quantos km o tanque dura
let kmL = 12/10; // exemplo: a cada 360 km o tanque zera
let tempoDecorridoSegundos = 1/60; // Exemplo para 60 frames por segundo
function updateFuelBar() {
  // diminui combustível conforme a distância
  // exemplo: 1 km gasta 10 de fuel
  let velocidadeKmS = velocidadeKmH / 3600; // 3600 segundos em uma hora
   // 2. Calcula a distância percorrida no último frame (em km)
  let distanciaPercorridaKm = velocidadeKmS * tempoDecorridoSegundos;
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
  let g = qtd * 10;
  currentFuel = Math.min(maxFuel, currentFuel + g); 
}