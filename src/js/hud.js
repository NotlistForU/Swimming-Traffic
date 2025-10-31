// @ts-nocheck
function atualizarVelocimetro() {
  const speedLabel = document.querySelector(".speedLabel");
  const needle = document.getElementById("speedNeedle");

  // Atualiza o texto
  let velocimetro = Math.trunc(velocidadeKmH) ;
  speedLabel.textContent = `${velocimetro} KM/H`;

  // 🔹 Atualiza o ponteiro (0–240 km/h → -90° até 90°)
  let maxVel = 240; 
  let minAngle = -90;
  let maxAngle = 90;

  let angle = minAngle + (velocidadeKmH / maxVel) * (maxAngle - minAngle);
  needle.style.transform = `rotate(${angle}deg)`;
}
// Combustivel HUD =======================================================
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
  if(celular){
    fuelBar.style.width = fuelPercent + "%";
  } else {
    fuelBar.style.height = fuelPercent + "%";
  }

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
// Moedas  da RUN HUD ========================================================================
function atualizarMoedasRunUI() {
  document.getElementById("coinsDisplay").textContent = "💰 " + moedasRun;
}

// Atualizar as moedas do menu ========================================================================
function atualizarMoedasUI() {
  const h3 = document.querySelector("#Moedas h3");
  if (h3) {h3.textContent = "Moedas: " + moedasJogador + " 🪙";}
  const moedaShop = document.querySelector("#MoedaShop h3");
  if(moedaShop){moedaShop.textContent = "Moedas: " + moedasJogador + " 🪙"};
}

//  Score run HUD ========================================================
function atualizarScoreUI() {
  document.getElementById("pointsDisplay").innerHTML =
    `<div>🏆 ${kmPercorridos.toFixed(2)} km</div>
     <div>⏱ ${tempoVivo.toFixed(1)}s</div>`;
}
// Score Menu HUD ========================================================
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