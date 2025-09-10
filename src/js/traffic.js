let carrosSpawnados = []; 
const alturaCarro = 200;

function spwanCar(numPista, quantCar){
  for(let i = 0; i < quantCar; i++){
    let valido = false;
    let numCol, numY;

    while(!valido){
      numY = Math.floor(Math.random() * 6000) + 1;
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

    // salva posição + elemento
    carrosSpawnados.push({ col: numCol, y: numY, el: carro });
  }
}

// atualiza movimento dos carros
function updateCars(){
  for (let c of carrosSpawnados) {
    c.y -= 3; // velocidade fixa = 1
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

spwanCar(5,20);