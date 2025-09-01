let player = document.getElementById("player");
let playerX = window.innerWidth / 2; // posição inicial no centro
let speed = 1;  // velocidade base da estrada
let accel = 0;  // aceleração extra quando pressiona W
let keys = {};

// controles
document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

function updatePlayer() {
  // movimento lateral
if (keys["a"] || keys["arrowleft"]) {
  playerX -= 5;
  player.style.left = playerX + "px";
  player.style.transform = "rotate(-10deg)";
} else if (keys["d"] || keys["arrowright"]) {
  playerX += 5;
  player.style.left = playerX + "px";
  player.style.transform = "rotate(10deg)";
} else {
  player.style.left = playerX + "px";
  player.style.transform = "rotate(0deg)";
}


  // aceleração
  if (keys["w"] || keys["arrowup"]) {
    accel = Math.min(accel + 0.05, 5);
  } else {
    accel = Math.max(accel - 0.05, 0);
  }
}
