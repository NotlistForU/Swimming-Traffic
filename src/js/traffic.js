function spwanCar(numPista){

    let numCol = (Math.floor(Math.random() * numPista) + 1);
    let coluna = document.getElementById(`col-${numCol}`);
    let numCar = Math.floor(Math.random() * 9) + 1;
    const carro = document.createElement("img");
    carro.src = `src/assets/images/TrafficCars/car${numCar}.png`;
    carro.alt = "TrafficCar"
    carro.classList.add("carro");
    coluna.appendChild(carro);
    const div = document.getElementsByTagName("div");
  /*for(let i = 0; i < numPista -1; i++){
    
    
  }*/
  
}

spwanCar(5);