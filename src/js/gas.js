// @ts-nocheck
let gasSpawnadas = [];
const alturaGas = 100; // altura da imagem da gasolina
const gasFrames = [
  "src/assets/images/Gas/gas1.png",
  "src/assets/images/Gas/gas2.png",
  "src/assets/images/Gas/gas3.png"
];
const gasSound = new Audio("src/assets/sounds/gasSound.mp3");
gasSound.volume = 0.2;

function updateGas(delta) {
  for (let c of gasSpawnadas) {
    // movimento para baixo baseado no tempo real
    c.y += c.vel * dificuldade * delta * 60; 

    // animação de sprite (troca a cada ~20 frames)
    c.frameTimer += delta * 60; 
    if (c.frameTimer > 20) {
      c.frame = (c.frame + 1) % gasFrames.length;
      c.el.src = gasFrames[c.frame];
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

  gasSpawnadas = gasSpawnadas.filter(c => c.y <= window.innerHeight);
}

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
