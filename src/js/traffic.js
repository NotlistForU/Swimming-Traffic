function spwanCar(numPista, quantCar){
    for(let i = 1; i < quantCar; i++){
      let numY = Math.floor(Math.random()* 6000) + 1;
      let carroY = numY + "px";
      let numCol = (Math.floor(Math.random() * numPista) + 1);
      let coluna = document.getElementById(`col-${numCol}`);
      let numCar = Math.floor(Math.random() * 9) + 1;
      const carro = document.createElement("img");
      carro.style.top = carroY; 
      carro.src = `src/assets/images/TrafficCars/car${numCar}.png`;
      carro.alt = "TrafficCar"
      carro.classList.add("carroBaixo");
      coluna.appendChild(carro);
    }
  
  
}

spwanCar(5, 10);



$(document).ready(function(){
  carro.getElementById("carro");
  carro.style.top
  
})
