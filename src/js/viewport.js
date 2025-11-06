const larguraJanela = window.innerWidth;
const alturaJanela = window.innerHeight;
let celular = false;

if (larguraJanela <= 768){ numPistas = 3; }


if (larguraJanela <= 600 || alturaJanela > larguraJanela) {
    celular = true;
}