document.addEventListener('keydown', function (event) {
  if ((event.ctrlKey || event.metaKey) && 
      (event.key === '+' || event.key === '-' || event.key === '=')) {
    event.preventDefault();
  }
});

document.addEventListener('wheel', function (event) {
  if (event.ctrlKey) {
    event.preventDefault();
  }
}, { passive: false });


function gameOver() {
  gameStarted = false;
  motorSound.pause();
  motorSound.currentTime = 0;
  AceleroSound.pause();
  AceleroSound.currentTime = 0;

  // 🔹 Mostra o menu de novo
  menu.style.display = "flex";

  // 🔹 Remove o player e carros da tela
  const player = document.getElementById("player");
  if (player) {
    player.remove();
  }
  carrosSpawnados.forEach(c => c.el.remove());
  carrosSpawnados = [];

  // Se tiver moedas/gasolina, limpa também
  coinsSpawnadas.forEach(m => m.el.remove());
  coinsSpawnadas = [];
  gasSpawnadas.forEach(g => g.el.remove());
  gasSpawnadas = [];

  // 🔹 (Opcional) resetar variáveis de jogo
  linhaAtual = 0;
  caminhosLivresAtuais = [];
}

function resetGame() {
  // zera arrays
  carrosSpawnados = [];
  coinsSpawnadas = [];
  gasSpawnadas = [];

  // zera variáveis
  linhaAtual = 0;
  caminhosLivresAtuais = [];

  // garante que o caminho inicial existe
  inicializarCaminho();
}