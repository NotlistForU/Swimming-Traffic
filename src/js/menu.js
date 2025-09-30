
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
let voltar = document.getElementById("divBtnVoltar");
let btnPlay = document.getElementById("btnPlay");
let hud = document.getElementById("hud");
let shop = document.getElementById("shop");
let ranking = document.getElementById("ranking");

$(document).ready(function() {
  config.classList.remove("menuConfig");
  config.classList.add("hidden");
  voltar.classList.add("hidden");
  mostrarRanking();
  renderShop();
  ranking.classList.add("flex");
  shop.classList.add("hidden");

});

document.getElementById("btnConfig").addEventListener("click",() =>{
    
    config.classList.remove("hidden");
    config.classList.add("menuConfig");
    btnconfig.classList.add("hidden");

    voltar.classList.remove("hidden");

    btnPlay.classList.add("hidden");
})

document.getElementById("btnVoltar").addEventListener("click",() =>{
    voltar.classList.add("hidden");
    config.classList.remove("menuConfig");
    config.classList.add("hidden");
    btnPlay.classList.remove("hidden");
    btnconfig.classList.remove("hidden");
});

document.getElementById("btnShop").addEventListener("click",() =>{
    ranking.classList.remove("flex");
    ranking.classList.add("hidden");
    shop.classList.remove("hidden");
});

document.getElementById("btnRanking").addEventListener("click",() =>{

    shop.classList.add("hidden");
    ranking.classList.remove("hidden");
    ranking.classList.add("flex");
});

let menu = document.getElementById("menu");
window.addEventListener("load", () => {
  atualizarMoedasUI(); // mostra moedas assim que a página carrega
});


let moedasRun = 0;
document.getElementById("btnPlay").addEventListener("click",() =>{
    menu.style.display = "none";
    hud.classList.remove("hidden");
    hud.classList.add("flex");
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



