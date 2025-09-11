let carrosSpawnados = []; 
const alturaCarro = 200;

function spwanCar(numPista, quantCar){
  for(let i = 0; i < quantCar; i++){
    let valido = false;
    let numCol, numY;

    while(!valido){
      numY = Math.floor(Math.random() * 7000) + 1;
      numCol = Math.floor(Math.random() * numPista) + 1;

      valido = true;
      for(let c of carrosSpawnados){
        // mesma coluna → checa sobreposição
        if(c.col === numCol){
          if(!(numY + alturaCarro < c.y || numY > c.y + alturaCarro)){
            valido = false;
            break;
          }
        }

        // coluna adjacente → checa proximidade
        if(Math.abs(c.col - numCol) === 1){
          if(Math.abs(c.y - numY) < alturaCarro){
            valido = false;
            break;
          }
        }
      }
    }

    // cria carro novo
    let coluna = document.getElementById(`col-${numCol}`);
    let numCar = Math.floor(Math.random() * 9) + 1;
    let carro = document.createElement("img");

    carro.src = `src/assets/images/TrafficCars/car${numCar}.png`;
    carro.alt = "TrafficCar";
    carro.classList.add("carroBaixo"); 
    carro.style.position = "absolute";
    carro.style.top = numY + "px";

    coluna.appendChild(carro);

    // velocidade aleatória entre 2 e 3
    let vel = 2 + Math.random(); 

    // salva posição + velocidade + elemento
    carrosSpawnados.push({ col: numCol, y: numY, el: carro, vel: vel });
  }
}

// atualiza movimento dos carros
function updateCars(){
  for (let c of carrosSpawnados) {
    // verifica se tem carro à frente na mesma coluna
    let carroFrente = null;
    for (let outro of carrosSpawnados) {
      if (outro.col === c.col && outro.y < c.y) {
        if (!carroFrente || outro.y > carroFrente.y) {
          carroFrente = outro; // pega o mais próximo
        }
      }
    }

    if (carroFrente && (c.y - carroFrente.y) < alturaCarro * 1.2) {
      // está muito perto do carro da frente
      if (c.vel > carroFrente.vel) {
        // tenta mudar de faixa
        let moved = false;
        for (let dir of [-1, 1]) { // tenta esquerda depois direita
          let novaCol = c.col + dir;
          if (novaCol >= 1 && novaCol <= 5) {
            // verifica se a nova faixa está livre
            let livre = true;
            for (let outro of carrosSpawnados) {
              if (outro.col === novaCol) {
                if (Math.abs(outro.y - c.y) < alturaCarro * 1.2) {
                  livre = false; // tem carro perto, não pode mudar
                  break;
                }
              }
            }
            if (livre) {
              c.el.classList.add("blink");
              // muda de faixa
              setTimeout(() => {
                  let novaColDiv = document.getElementById(`col-${novaCol}`);
                  novaColDiv.appendChild(c.el);
                  c.col = novaCol;

                  // para de piscar
                  c.el.classList.remove("blink");
                }, 400);
              moved = true;
              break;
            }
          }
        }

        if (!moved) {
          // não conseguiu mudar → iguala velocidade ao da frente
          c.vel = carroFrente.vel;
        }
      }
    }

    // move carro
    c.y -= c.vel;
    c.el.style.top = c.y + "px";
  }
}


// loop dos carros
let movimentoCarros = setInterval(() => {
  if (!colisao) {
    updateCars();
  } else {
    clearInterval(movimentoCarros);
  }
}, 16); // ~60fps

spwanCar(5,30);
