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
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
    window.scrollTo({
    top:    playerY - window.innerHeight / 2,
    left:   0,
    behavior: "auto"  
    });
  }
}




const angulo = 0;
let anguloAtual = 0;
let playerX = -184; // porcentagem (centralizado)
let playerY = 7200; // porcentagem (embaixo da tela)
let colisao = false;
let velocidade = 1;
let movimento = setInterval(() => {
  if (!colisao) {
    playerY -= velocidade;
    updatePlayer();
    
  } else {
    clearInterval(movimento);
  }
}, 1);

document.addEventListener('keydown', function(event){
  if(event.key === 'W' || event.key === 'w' || event.key === 'ArrowUp'){
      playerY -= 7;
     
  }
   else if (event.key === 'S' || event.key === 's' || event.key === 'ArrowDown'){
      playerY += 3;
  } else if (event.key === 'A' || event.key === 'a' || event.key === 'ArrowLeft'){
    anguloAtual = -2;
    playerX -= 15;

  } else if (event.key === 'D' || event.key === 'd' || event.key === 'ArrowRight'){
    anguloAtual = +2;
    playerX += 15;
  }
  updatePlayer();

});
document.addEventListener('keyup', function(event) {

  if (
    event.key === 'A' || event.key === 'a' || event.key === 'ArrowLeft' ||
    event.key === 'D' || event.key === 'd' || event.key === 'ArrowRight'
  ) {
    anguloAtual = 0;
    updatePlayer();
  }
});




creatPlayer(5);
updatePlayer();
