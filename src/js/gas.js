let gasSpawnadas = [];
const alturaGas = 100; // altura da imagem da gasolina
const gasFrames = [
  "src/assets/images/Gas/gas1.png",
  "src/assets/images/Gas/gas2.png",
  "src/assets/images/Gas/gas3.png"
];


function updateGas() {
  for (let c of gasSpawnadas) {
    // movimento para baixo
    c.y += c.vel;

    // animação de sprite (troca a cada ~10 frames)
    c.frameTimer++;
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

let fuelBar = document.getElementById("fuelBar");
