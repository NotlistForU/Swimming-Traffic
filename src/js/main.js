function gameOver() {
  gameStarted = false;
  motorSound.pause();
  AceleroSound.pause();
  
  location.reload(); // reinicia jogo (ou pode mandar pro menu)
}
