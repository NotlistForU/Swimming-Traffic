let coinsSpawnadas = [];
const alturaCoin = 60; // altura da imagem da moeda
const coinFrames = [
  "src/assets/images/Coins/coin1.png",
  "src/assets/images/Coins/coin2.png",
  "src/assets/images/Coins/coin3.png"
];
const coinSound = new Audio("src/assets/sounds/goldCoinSound.mp3");
coinSound.volume = 1;

let moedasJogador = parseInt(localStorage.getItem("moedas")) || 0;
function updateCoins() {
  for (let c of coinsSpawnadas) {
    // movimento para baixo
    c.y += c.vel * dificuldade;

    // animação de sprite (troca a cada ~10 frames)
    c.frameTimer++;
    if (c.frameTimer > 20) {
      c.frame = (c.frame + 1) % coinFrames.length;
      c.el.src = coinFrames[c.frame];
      c.frameTimer = 0;
    }

    // efeito de flutuação (sobe e desce até 5px)
    c.floatOffset += c.floatDir * 0.3;
    if (c.floatOffset > 5 || c.floatOffset < -5) {
      c.floatDir *= -1;
    }

    // aplica posição
    c.el.style.top = (c.y + c.floatOffset) + "px";

    // remove se saiu da tela
    if (c.y > window.innerHeight) {
      c.el.remove();
    }
  }

  coinsSpawnadas = coinsSpawnadas.filter(c => c.y <= window.innerHeight);
}
