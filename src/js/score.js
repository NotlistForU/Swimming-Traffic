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