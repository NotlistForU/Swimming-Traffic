 function creatPlayer(numPista){
    let numCol = (Math.floor(numPista / 2) + 1 );
    let col = document.getElementById(`col-4`);
    const player = document.createElement("img");
    player.src = `src/assets/images/PlayerCars/car7.png`;
    player.alt = "player"
    player.classList.add("player");
    player.id ="player";
    col.appendChild(player);
} 





function updatePlayer() {
  const player = document.getElementById("player");
  if (player) {
    player.style.transform = `rotate(${anguloAtual}deg)`
    player.style.left = playerX + "%";
    player.style.top = playerY + "%";
  }
}

const angulo = 0;
let anguloAtual = 0;
let playerX = 50; // porcentagem (centralizado)
let playerY = 95; // porcentagem (embaixo da tela)
document.addEventListener('keydown', function(event){
  if(event.key === 'W' || event.key === 'w' || event.key === 'ArrowUp'){
    playerY -= 2;
  } else if (event.key === 'S' || event.key === 's' || event.key === 'ArrowDown'){
    playerY += 2;
  } else if (event.key === 'A' || event.key === 'a' || event.key === 'ArrowLeft'){
    anguloAtual = -10;
    playerX -= 5;

  } else if (event.key === 'D' || event.key === 'd' || event.key === 'ArrowRight'){
    anguloAtual = +10;
    playerX += 5;
  } else{
    anguloAtual = angulo;
  }
  updatePlayer();
  anguloAtual = angulo;
});


creatPlayer(5);
updatePlayer();
