
const motorVol = document.getElementById("motorVol");
const aceleroVol = document.getElementById("aceleroVol");

motorVol.addEventListener("input", () => {
  motorSound.volume = parseFloat(motorVol.value);
});
aceleroVol.addEventListener("input", () => {
  AceleroSound.volume = parseFloat(aceleroVol.value);
});


let config = document.getElementById("config");
let btnconfig = document.getElementById("btnConfig");
let voltar = document.getElementById("divBtnVoltar");
let btnPlay = document.getElementById("btnPlay");

$(document).ready(function() {
  let config = document.getElementById("config");
  config.classList.remove("menuConfig");
  config.classList.add("hidden");
  let voltar = document.getElementById("divBtnVoltar");
  voltar.classList.add("hidden");
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

document.getElementById("btnPlay").addEventListener("click",() =>{
    document.getElementById("menu").style.display = "none";
    gameStarted = true;
    creatPlayer(5); // começa na coluna 3 (meio)
    updatePlayer();
});

