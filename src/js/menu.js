// @ts-nocheck
// preview de som curto (para feedback no slider)
const motorPreview = new Audio("src/assets/sounds/car5-5-5.mp3");
motorPreview.volume = vol;
motorVol.addEventListener("input", () => {
  vol = parseFloat(motorVol.value);
  // preview curto
  motorPreview.volume = vol;
  motorPreview.currentTime = 3.5;

  // cancela preview anterior se estiver tocando
  motorPreview.pause();
  clearTimeout(motorPreview._stopTimeout);

  motorPreview.play();

  // para o som após ~2.3 segundos
  motorPreview._stopTimeout = setTimeout(() => {
    motorPreview.pause();
    motorPreview.currentTime = 3.5;
  }, 2300);
});

const musicList = [
  "src/assets/sounds/Running90s.mp3",
  "src/assets/sounds/GetLow.mp3"
];
const seekBar = document.getElementById("musicSeek");
let currentTrack = 0;
let bgMusic = new Audio(musicList[currentTrack]);
bgMusic.volume = 0.5;

document.getElementById("playPauseMusic").addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
  } else {   
    bgMusic.pause();
  }
});

document.getElementById("nextMusic").addEventListener("click", () => {
  bgMusic.pause();
  currentTrack = (currentTrack + 1) % musicList.length;
  bgMusic = new Audio(musicList[currentTrack]);

  bgMusic.volume = document.getElementById("musicVol").value;
  bgMusic.play();
});

document.getElementById("prevMusic").addEventListener("click", () => {
  bgMusic.pause();
  currentTrack = (currentTrack - 1 + musicList.length) % musicList.length;
  bgMusic = new Audio(musicList[currentTrack]);

  bgMusic.volume = document.getElementById("musicVol").value;
  bgMusic.play();
});

document.getElementById("musicVol").addEventListener("input", (e) => {
  bgMusic.volume = e.target.value;
});

// 🔹 Permite arrastar a barra para mudar o tempo
seekBar.addEventListener("input", () => {
  const seekTime = (seekBar.value / 100) * bgMusic.duration;
  bgMusic.currentTime = seekTime;
});

// 🔹 Quando a música acabar, toca a próxima
bgMusic.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % musicList.length;
  bgMusic = new Audio(musicList[currentTrack]);
  bgMusic.volume = document.getElementById("musicVol").value;
  bgMusic.play();

  // reanexa os eventos na nova música
  bgMusic.addEventListener("timeupdate", () => {
    if (bgMusic.duration) {
      const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
      seekBar.value = progress;
    }
  });
});





let imageIcon = document.getElementById("imageIcon");
let config = document.getElementById("config");
let btns = document.getElementById("btns");
let btnConfig = document.getElementById("btnConfig");
let btnPlay = document.getElementById("btnPlay");
let btnRanking = document.getElementById("btnRanking");
let btnShop = document.getElementById("btnShop");
let btnNormal = document.getElementById("btnNormal");
let btnNevoa = document.getElementById("btnNevoa");
let btnVoltar = document.getElementById("btnVoltar");
let btnAjuda = document.getElementById("btnAjuda");
let btnRestart = document.getElementById("btnRestart");
let btnVoltarMenu = document.getElementById("btnVoltarMenu");
let hud = document.getElementById("hud");
let shop = document.getElementById("shop");
let ranking = document.getElementById("divRanking");
let teclaA = document.getElementById("teclaA");
let teclaD = document.getElementById("teclaD");
let tutorial = document.getElementById("tutorial");
let textTutorial = document.getElementById("textTutorial");
let btnOkTutorial = document.getElementById("btnOkTutorial");
let perfil = document.getElementById("perfil");
let titulo = document.getElementById("titulo");
let titloGameOver = document.getElementById("tituloGameOver");
let btnGameOver = document.getElementById("btnGameOver");




const resSelect = document.getElementById('resSelect');
resSelect.addEventListener('change', function () {
  const scale = parseFloat(this.value);
  localStorage.setItem("escalaSelecionada", scale);
  aplicarEscala(scale);
});

function aplicarEscala(scale) {
  // Aplica o scale nos elementos desejados
  [perfil, btns, textTutorial, titulo, btnGameOver, titloGameOver].forEach(el => {
    if (el) {
      el.style.transform = `scale(${scale})`;
      el.style.transformOrigin = 'center center';
    }
  });

  // Aplica o gap proporcional em todos
  const baseGap = 18;
  [menu, perfil, btns, textTutorial].forEach(el => {
    if (el) {
      let compressedGap;
      if (scale === 1) {
        compressedGap = baseGap;
      } else if (el === menu) {
        compressedGap = (baseGap - 10) * scale;
      } else {
        compressedGap = baseGap * scale;
      }
      el.style.gap = `${compressedGap}px`;
    }
  });
}




$(document).ready(function() {
  mostrarRanking();
  renderShop();
});

document.getElementById("btnOkTutorial").addEventListener("click", () => {
  esconder(tutorial);
  mostrar(menu);
});

document.getElementById("imageIcon").addEventListener("click", () => {
  esconder(ranking);
  esconder(shop);
  esconder(config);
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
  esconder(btnAjuda);
  mostrar(btnNormal);
  mostrar(btnNevoa);
  mostrar(btnVoltar);
});

document.getElementById("btnNormal").addEventListener("click", () =>{
  gameMode = "normal";
  startGame(gameMode);
  atualizarVisibilidade(gameMode);
});

document.getElementById("btnNevoa").addEventListener("click", () =>{
  gameMode = "nevoa";
  startGame(gameMode);
  atualizarVisibilidade(gameMode);
});

document.getElementById("btnVoltar").addEventListener("click", () => {
  esconder(btnNormal);
  esconder(btnNevoa);
  esconder(btnVoltar);
  mostrar(btnAjuda);
  mostrar(btnRanking);
  mostrar(btnShop);
  mostrar(btnConfig);
  mostrar(btnPlay);
});

document.getElementById("btnAjuda").addEventListener("click", () => {
  esconder(menu);
  mostrar(tutorial);
});

document.getElementById("btnRestart").addEventListener("click", () => {
  esconder(telaGameOver);
  startGame(gameMode);
});

document.getElementById("btnVoltarMenu").addEventListener("click", () => {
  esconder(telaGameOver);
  esconder(btnNormal);
  esconder(btnNevoa);
  esconder(btnVoltar);
  mostrar(btnRanking);
  mostrar(btnShop);
  mostrar(btnConfig);
  mostrar(btnPlay);
  gameMode = "normal";
  atualizarVisibilidade(gameMode);
  mostrar(menu);
});

let menu = document.getElementById("menu");
window.addEventListener("load", () => {
  atualizarMoedasUI(); // mostra moedas assim que a página carrega
  const savedScale = parseFloat(localStorage.getItem('escalaSelecionada'));
  if (!isNaN(savedScale)) {
    resSelect.value = savedScale.toString();
    aplicarEscala(savedScale);
  }
});


/* telcas HUD ===================================== */
document.addEventListener("keydown", function(event){
  if(!gameStarted){return};
  if (event.key === "a") {
    teclaA.style.fontSize = "x-large";
  }
});
document.addEventListener("keyup", function(event){
    if (event.key === "a") {
    teclaA.style.fontSize = "xx-large";
  }
});
document.addEventListener("keydown", function(event){
  if(!gameStarted){return};
  if (event.key === "d") {
    teclaD.style.fontSize = "x-large";
  }
});
document.addEventListener("keyup", function(event){
    if (event.key === "d") {
    teclaD.style.fontSize = "xx-large";
  }
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

function mostrarGameOver(){
  kmFinal.textContent = kmPercorridos.toFixed(1);
  moedasFinal.textContent = moedasRun;
  mostrar(telaGameOver);
}





