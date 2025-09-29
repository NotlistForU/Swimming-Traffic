function salvarPontuacao(score) {
  // pega ranking atual ou cria vazio
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  // adiciona nova pontuação
  ranking.push(score);

  // ordena do maior para o menor
  ranking.sort((a, b) => b - a);

  // mantém só os 5 melhores
  ranking = ranking.slice(0, 5);

  // salva de volta no localStorage
  localStorage.setItem("ranking", JSON.stringify(ranking));
}


function mostrarRanking() {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  let lista = document.getElementById("rankingList");

  lista.innerHTML = ""; // limpa antes de preencher

  ranking.forEach((score, i) => {
    let li = document.createElement("li");
    li.textContent = `${i + 1}º - ${score} pontos`;
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
let fuelBar = document.getElementById("fuelBar");
// function updateFuelBar(){

  
// }


function atualizarScore() {
  if (!gameStarted) return;

  // tempo vivo em segundos
  tempoVivo = (Date.now() - startTime) / 1000;

  // distância percorrida em km
  kmPercorridos = (tempoVivo / 3600) * velocidadeKmH;

  atualizarScoreUI();
}

function atualizarScoreUI() {
   document.getElementById("pointsDisplay").innerHTML =
    `<div>🏆 ${kmPercorridos.toFixed(2)} km</div>
     <div>⏱ ${tempoVivo.toFixed(1)}s</div>`;
}