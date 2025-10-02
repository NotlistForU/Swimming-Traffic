 // @ts-nocheck
 let novaVelocidade = 0.2;
function atualizarVelocidadeFaixa() {
  // quanto maior a dificuldade, menor a duração da animação
    novaVelocidade = Math.max(0.05, 0.2 / dificuldade); 
    document.querySelectorAll(".pista1").forEach(faixa => {
    faixa.style.setProperty("--faixa-speed", novaVelocidade + "s");
  });
}