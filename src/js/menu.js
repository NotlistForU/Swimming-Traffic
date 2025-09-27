
const motorVol = document.getElementById("motorVol");
const aceleroVol = document.getElementById("aceleroVol");

motorVol.addEventListener("input", () => {
  motorSound.volume = parseFloat(motorVol.value);
});
aceleroVol.addEventListener("input", () => {
  AceleroSound.volume = parseFloat(aceleroVol.value);
});


document.getElementById("btnPlay").addEventListener("click",() =>{
    document.getElementById("menu").style.display = "none";
    gameStarted = true;
    creatPlayer(5); // começa na coluna 3 (meio)
    updatePlayer();
});