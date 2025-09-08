let colunaAtual = 3; // começa na coluna do meio (1 a 5)

function creatPlayer(numPista) {
  colunaAtual = numPista; // define onde vai nascer
  let col = document.getElementById(`col-${colunaAtual}`);
  const player = document.createElement("img");
  player.src = `src/assets/images/PlayerCars/car7.png`;
  player.alt = "player";
  player.classList.add("player");
  player.id = "player";
  col.appendChild(player);
}

function updatePlayer() {
  const player = document.getElementById("player");
  if (player) {
    player.style.transform = `rotate(${anguloAtual}deg)`;
    player.style.top = playerY + "px";

    // garante que o player esteja sempre na coluna certa
    let col = document.getElementById(`col-${colunaAtual}`);
    if (!col.contains(player)) {
      col.appendChild(player);
    }

    window.scrollTo({
      top: playerY - window.innerHeight / 2,
      left: 0,
      behavior: "auto"
    });
  }
}

const angulo = 0;
let anguloAtual = 0;
let playerY = 7200; 
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
  } 
  else if (event.key === 'A' || event.key === 'a' || event.key === 'ArrowLeft'){
    if (colunaAtual > 1) {
      colunaAtual--; // muda para a coluna à esquerda
      anguloAtual = -10;
    }
  } 
  else if (event.key === 'D' || event.key === 'd' || event.key === 'ArrowRight'){
    if (colunaAtual < 5) {
      colunaAtual++; // muda para a coluna à direita
      anguloAtual = 10;
    }
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

creatPlayer(3); // começa na coluna 3 (meio)
updatePlayer();
