let nitrosSpawnados = [];
const alturaNitro = 600;

function spwanNitro(numPista, quantNitro) {
    for(let i = 0; i < quantNitro; i++){
        let valido = false;
        let numY, numCol;
        while(!valido){
            numY = Math.floor(Math.random() * 55000) + 1;
            numCol = Math.floor(Math.random() * numPista) + 1;
            
            valido = true;
            for(let n of nitrosSpawnados){

                if(n.col === numCol){
                    if(!(numY + alturaNitro <  n.y || numY > n.y + alturaNitro)){
                        valido = false;
                        break
                    }

                    if(Math.abs(n.col - numCol) === 1){
                        if(Math.abs(n.y - numY) < alturaNitro){
                            valido = false;
                            break;
                        }
                    }
                }
            }
        }
        
        let coluna = document.getElementById(`col-${numCol}`);
        let nitro = document.createElement("img");
        nitro.src = `src/assets/images/Nitro/nitroGolden.png`;
        nitro.alt = "Nitro";
        nitro.classList.add("nitro");
        coluna.appendChild(nitro);

        nitrosSpawnados.push({col: numCol, y: numY});
    }
    
}
spwanNitro(8, 100);