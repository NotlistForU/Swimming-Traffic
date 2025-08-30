let tabela = document.getElementById("tabela");
let select = document.getElementById("cenario");

function criarTabela(pistas, linhas = 10) {
    tabela.innerHTML = "";
    tabela.style.setProperty("--pistas", pistas);

    for (let row = 1; row <= linhas; row++) {
        for (let col = 1; col <= pistas; col++) {
            let cell = document.createElement("div");
            

            // Classe baseada na linha
            cell.classList.add(`linha-${row}`);
            let img = document.createElement("img");
            img.src = `./src/assets/images/costasLinha${row}/carMaserati.png`;
            img.alt = `Carro linha ${row}`;
            img.classList.add("carro");
            cell.appendChild(img);

            // Só pra visualizar

            tabela.appendChild(cell);
        }
    }
}                                                                               

criarTabela(3);

select.addEventListener("change", function(){
    criarTabela(parseInt(this.value));
});