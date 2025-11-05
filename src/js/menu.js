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

/*------------------------------------------------------------*/
/* -------- CONTROLE MUSICA DO MENU -------------------------- */
/* ----- Para adicionar novas musicas vá para: music.js ----- */
const seekBar = document.getElementById("musicSeek");
let currentTrack = 0;
let bgMusic = new Audio();
bgMusic.volume = 0.5;

function loadTrack(index) {
  bgMusic.src = musicList[index].src;
  bgMusic.currentTime = 0;
  updateMusicInfo();
}

document.getElementById("playPauseMusic").addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
  } else {   
    bgMusic.pause();
  }
});

document.getElementById("nextMusic").addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % musicList.length;
  loadTrack(currentTrack);
  bgMusic.play();
});

document.getElementById("prevMusic").addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + musicList.length) % musicList.length;
  loadTrack(currentTrack);
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
  loadTrack(currentTrack);
  bgMusic.play();
});

function updateMusicInfo(){
  musicaTitulo.textContent = musicList[currentTrack].nome;
  musicaCapa.src = musicList[currentTrack].img;
  musicaCapa.alt = "Capa da musica: " + musicList[currentTrack].nome;
}


bgMusic.addEventListener("timeupdate", () => {
  if (bgMusic.duration) {
    const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
    seekBar.value = progress;
  }
});

  // Quando a música termina, toca a próxima
bgMusic.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % musicList.length;
  bgMusic = new Audio(musicList[currentTrack].src);
  bgMusic.volume = document.getElementById("musicVol").value;
  attachEvents();       // reaplica os eventos no novo bgMusic
  updateMusicInfo();    // atualiza capa e nome
  bgMusic.play();       // toca a próxima
});

let menu = document.getElementById("menu");
let hudTeclaA = document.getElementById("hudTeclaA");
let hudTeclaD = document.getElementById("hudTeclaD");
let musicaCapa = document.getElementById("musicaCapa");
let musicaTitulo = document.getElementById("musicaTitulo");
let pause = document.getElementById("pause");
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
let btnVoltarMenuPause = document.getElementById("btnVoltarMenuPause");
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
let btnsPause = document.getElementById("btnsPause");
let celularHud = document.getElementById("celularHud");




const resSelect = document.getElementById('resSelect');
resSelect.addEventListener('change', function () {
  const scale = parseFloat(this.value);
  localStorage.setItem("escalaSelecionada", scale);
  aplicarEscala(scale);
});

function aplicarEscala(scale) {
  // Aplica o scale nos elementos desejados`
  [road, textTutorial, menu, btnGameOver, titloGameOver, btnsPause].forEach(el => {
    if (el) {
      if(celular){
        road.style.transformOrigin = `center top`
      }
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
  esconder
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

document.getElementById("btnRestartPause").addEventListener("click", () => {
  esconder(pause);
  gamePaused = false;
  gameOver();
});

function voltarMenu(){
  gamePaused = false;
  esconder(hudTeclaA);
  esconder(hudTeclaD);
  esconder(celularHud);
  esconder(pause);
  esconder(telaGameOver);
  esconder(btnNormal);
  esconder(btnNevoa);
  esconder(btnVoltar);
  mostrar(btnAjuda);
  mostrar(btnRanking);
  mostrar(btnShop);
  mostrar(btnConfig);
  mostrar(btnPlay);
  gameMode = "normal";
  atualizarVisibilidade(gameMode);
  mostrar(menu);
}
document.getElementById("btnVoltarMenuPause").addEventListener("click", () => {
  gameOver();
  voltarMenu();
});
document.getElementById("btnVoltarMenu").addEventListener("click", () => {
  voltarMenu();
});



window.addEventListener("load", () => {
  atualizarMoedasUI(); // mostra moedas assim que a página carrega
  const savedScale = parseFloat(localStorage.getItem('escalaSelecionada'));
  if (!isNaN(savedScale)) {
    resSelect.value = savedScale.toString();
    aplicarEscala(savedScale);
  }else {
    if(celular) {
      let defaultScaleCelular = 0.9;
      resSelect.value = defaultScaleCelular.toString();
      aplicarEscala(defaultScaleCelular);
    } else {
      let defaultScale = 0.9;
      resSelect.value = defaultScale.toString();
      aplicarEscala(defaultScale);
    }
  }
});


/* telcas HUD ===================================== */
document.addEventListener("keydown", function(event){
  if(!gameStarted){return};
  if (event.key === "a") {
    if (celular){
      teclaA.style.fontSize = "small";
    }else{
    teclaA.style.fontSize = "x-large";
    }
  }
});
document.addEventListener("keyup", function(event){
    if (event.key === "a") {
      if(celular){
        teclaA.style.fontSize = "large";
      }else {
      teclaA.style.fontSize = "xx-large";
      }
  }
});
document.addEventListener("keydown", function(event){
  if(!gameStarted){return};
  if (event.key === "d") {
    if(celular){
      teclaD.style.fontSize = "small";
    }else{
      teclaD.style.fontSize = "x-large";
    }
  }
});
document.addEventListener("keyup", function(event){
  if (event.key === "d") {
    if(celular){
      teclaD.style.fontSize = "large";
    }else{
      teclaD.style.fontSize = "xx-large";
    }
  }
});

function mostrarHud () {
  if (celular) {
    mostrar(celularHud);
    mostrar(hudTeclaA);
    mostrar(hudTeclaD);
  } else { return }
}


function startGame(gameMode){
    esconder(menu);
    startTime = Date.now();   // 🔹 marca o início da run
    tempoVivo = 0;
    kmPercorridos = 0;
    atualizarScoreUI();
    mostrarHud(celularHud);
    atualizarMoedasUI();
    moedasRun = 0;
    atualizarMoedasRunUI();
    gameStarted = true;
    resetGame();
    createPlayer(numPistas); // começa na coluna 3 (meio)
    spawnFileira();
    updatePlayer();
}

function mostrarGameOver(){
  kmFinal.textContent = kmPercorridos.toFixed(1);
  moedasFinal.textContent = moedasRun;
  mostrar(telaGameOver);
}




loadTrack(currentTrack);
