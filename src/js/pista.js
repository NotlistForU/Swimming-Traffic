// @ts-nocheck
let road = document.getElementById("road");
function criarPista(quantPista){
    for(let i = 0 ; i < quantPista; i++){
        let pista = document.createElement('div');
        let col = i + 1;
        pista.id = `col-${col}`;
        if(i === quantPista - 1){
            pista.classList.add('ultima');
        }else{
            pista.classList.add('faixa');
        }
        road.appendChild(pista);
    }
}