// @ts-nocheck
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

function getMelhorKm() {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  if (ranking.length === 0) return 0;

  // pega o maior km do ranking
  let melhor = ranking.reduce((max, item) => Math.max(max, item.km), 0);
  return melhor;
}

function resetarMoedas() {
  moedasJogador = 0;
  moedasRun = 0;
  localStorage.setItem("moedas", moedasJogador);
  atualizarMoedasUI();
  atualizarMoedasRunUI();
  console.log("💰 Moedas resetadas!");
}
// SCORE DO RANKING  ==================
function atualizarScore(delta) {
  if (!gameStarted) return;

  tempoVivo += delta;
  velocidadeKmH = velocidadeBase * velocidadeMultiplicador * dificuldade * 5;
  // distância percorrida em km
  kmPercorridos += (velocidadeKmH / 3600) * delta;

  // ex: a cada 1 km percorrido, aumenta 5 km/h
  velocidadeKmH = 60 + kmPercorridos * 6;

  atualizarVelocimetro();
  atualizarScoreUI();
}
