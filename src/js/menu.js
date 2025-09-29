
const motorVol = document.getElementById("motorVol");
const aceleroVol = document.getElementById("aceleroVol");
const motorPreview = new Audio("src/assets/sounds/naManhaBMW3.mp3");
const aceleroPreview = new Audio("src/assets/sounds/AcelerandoGTR.mp3");

motorVol.addEventListener("input", () => {
  const vol = parseFloat(motorVol.value);
  motorSound.volume = vol;

  // preview curtinho
  motorPreview.volume = vol;
  motorPreview.currentTime = 5;
  motorPreview.play();

  // para depois de 500ms (meio segundo)
  setTimeout(() => {
    motorPreview.pause();
    motorPreview.currentTime = 5;
  }, 2000);
});

aceleroVol.addEventListener("input", () => {
  const vol = parseFloat(aceleroVol.value);
  AceleroSound.volume = vol;

  // preview curtinho
  aceleroPreview.volume = vol;
  aceleroPreview.currentTime = 3;
  aceleroPreview.play();

  // para depois de 500ms
  setTimeout(() => {
    aceleroPreview.pause();
    aceleroPreview.currentTime = 3;
  }, 1500);
});

let config = document.getElementById("config");
let btnconfig = document.getElementById("btnConfig");
let voltar = document.getElementById("divBtnVoltar");
let btnPlay = document.getElementById("btnPlay");
let hud = document.getElementById("hud");

$(document).ready(function() {
  config.classList.remove("menuConfig");
  config.classList.add("hidden");
  voltar.classList.add("hidden");
  mostrarRanking();


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
})

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



