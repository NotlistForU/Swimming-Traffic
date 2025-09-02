function spwanCar(numPista){
  for(let i = 0; i < numPista -1; i++){
    
    numCol = Math.floor(Math.random() * numPista)
    const coluna = document.getElementById(`col-${colNum}`);

    const carro = document.createElement("img");
    carro.src = `./assets/images/TrafficCars/car${carNum}.png`;
    carro.alt = "TrafficCar"
    carro.classList.add("carro");
    const div = document.getElementsByTagName("div");
  }
  
}