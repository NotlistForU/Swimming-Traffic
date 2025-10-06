// @ts-nocheck

function updateCoins(delta) {
  for (let c of coinsSpawnadas) {
    // movimento para baixo baseado no tempo real
    c.y += c.vel * dificuldade * delta * 60; 

    // animação de sprite (troca a cada ~20 frames normalizados)
    c.frameTimer += delta * 60;
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
