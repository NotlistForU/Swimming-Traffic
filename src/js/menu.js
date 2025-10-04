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
let btnConfig = document.getElementById("btnConfig");
let btnPlay = document.getElementById("btnPlay");
let btnRanking = document.getElementById("btnRanking");
let btnShop = document.getElementById("btnShop");
let btnNormal = document.getElementById("btnNormal");
let btnNevoa = document.getElementById("btnNevoa");
let btnVoltar = document.getElementById("btnVoltar");
let hud = document.getElementById("hud");
let shop = document.getElementById("shop");
let ranking = document.getElementById("divRanking");
let moedasRun = 0;
// Funções utilitárias
function mostrar(el) {
  el.classList.add("flex");
  el.classList.remove("hidden");
}

function esconder(el) {
  el.classList.remove("flex");
  el.classList.add("hidden");
}


$(document).ready(function() {
  mostrarRanking();
  renderShop();
});

document.getElementById("btnConfig").addEventListener("click", () => {
  esconder(ranking);
  esconder(shop);
  mostrar(config);
});

document.getElementById("btnShop").addEventListener("click", () => {
  esconder(config);
  esconder(ranking);
  mostrar(shop);
});

document.getElementById("btnRanking").addEventListener("click", () => {
  esconder(shop);
  esconder(config);
  mostrar(ranking);
});

document.getElementById("btnPlay").addEventListener("click", () => {
  esconder(btnRanking);
  esconder(btnShop);
  esconder(btnConfig);
  esconder(btnPlay);
  mostrar(btnNormal);
  mostrar(btnNevoa);
  mostrar(btnVoltar);
});

document.getElementById("btnNormal").addEventListener("click", () =>{
  gameMode = "normal";
  startGame(gameMode);
});

document.getElementById("btnNevoa").addEventListener("click", () =>{
  gameMode = "nevoa";
  startGame(gameMode);
});

document.getElementById("btnVoltar").addEventListener("click", () => {
  esconder(btnNormal);
  esconder(btnNevoa);
  esconder(btnVoltar);

  mostrar(btnRanking);
  mostrar(btnShop);
  mostrar(btnConfig);
  mostrar(btnPlay);
});

let menu = document.getElementById("menu");
window.addEventListener("load", () => {
  atualizarMoedasUI(); // mostra moedas assim que a página carrega
});

function startGame(gameMode){
    esconder(menu);
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
}





