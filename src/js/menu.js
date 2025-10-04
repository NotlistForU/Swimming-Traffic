
// @ts-nocheck
const motorVol = document.getElementById("motorVol");
const motorPreview = new Audio("src/assets/sounds/car5-5-5.mp3");

motorVol.addEventListener("input", () => {
  const vol = parseFloat(motorVol.value);
  // preview curtinho
  motorPreview.volume = vol;
  motorPreview.currentTime = 3.50;
  motorPreview.play();

  // para depois de 500ms (meio segundo)
  setTimeout(() => {
    motorPreview.pause();
    motorPreview.currentTime = 3.50;
  }, 2340);
});

let config = document.getElementById("config");
let btnconfig = document.getElementById("btnConfig");
let btnPlay = document.getElementById("btnPlay");
let hud = document.getElementById("hud");
let shop = document.getElementById("shop");
let ranking = document.getElementById("divRanking");

$(document).ready(function() {
  mostrarRanking();
  renderShop();
});

document.getElementById("btnConfig").addEventListener("click",() =>{
    ranking.classList.remove("flex");
    ranking.classList.add("hidden");
    shop.classList.remove("flex");
    shop.classList.add("hidden");
    config.classList.remove("hidden");
    config.classList.add("flex");
})

document.getElementById("btnShop").addEventListener("click",() =>{
    config.classList.remove("flex");
    config.classList.add("hidden");
    ranking.classList.remove("flex");
    ranking.classList.add("hidden");
    shop.classList.remove("hidden");
});

document.getElementById("btnRanking").addEventListener("click",() =>{
    shop.classList.remove("flex");
    shop.classList.add("hidden");
    config.classList.remove("flex");
    config.classList.add("hidden");
    ranking.classList.remove("hidden");
    ranking.classList.add("flex");
});

let menu = document.getElementById("menu");
window.addEventListener("load", () => {
  atualizarMoedasUI(); // mostra moedas assim que a página carrega
});


let moedasRun = 0;
document.getElementById("btnPlay").addEventListener("click",() =>{
    menu.classList.remove("flex");
    menu.classList.add("hidden");
    startTime = Date.now();   // 🔹 marca o início da run
    tempoVivo = 0;
    kmPercorridos = 0;
    atualizarScoreUI();

    atualizarMoedasUI();
    moedasRun = 0;
    atualizarMoedasRunUI();
    gameStarted = true;
    resetGame();
    creatPlayer(4); // começa na coluna 3 (meio)
    spawnFileira();
    updatePlayer();
});



