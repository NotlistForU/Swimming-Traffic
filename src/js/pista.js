function criarPista(quantPista){

    let conteiner = document.createElement('div');
    conteiner.id = 'conteiner';
    for(let i = 0 ; i < quantPista; i++){
        let pista = document.createElement('div');
        let col = i + 1;
        pista.id = `col-${col}`;
        if(i === quantPista - 1){
            pista.classList.add('pista5');
        }else{
            pista.classList.add('pista1');
        }
        conteiner.appendChild(pista);
    }
    document.body.appendChild(conteiner);
}