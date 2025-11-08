// @ts-nocheck
// =====================
// LISTA DE CARROS
// =====================

let carros = [
  { id: 1, nome: "Golf GTI", prefix: "car1", preco: 0, kmNecessario: 0, comprado: true },
  { id: 2, nome: "BMW M4 cs", prefix: "car2", preco: 30, kmNecessario: 1.3, comprado: false },
  { id: 3, nome: "Supra MK4", prefix: "car3", preco: 45, kmNecessario: 2.5, comprado: false },
  { id: 4, nome: "Nissan GT-R Nismo", prefix: "car4", preco: 60, kmNecessario: 4.5, comprado: false },
  { id: 5, nome: "La Ferrari", prefix: "car5", preco: 70, kmNecessario: 8.5, comprado: false }
];

// =====================
// CARREGAR PROGRESSO
// =====================
const carrosSalvos = JSON.parse(localStorage.getItem("carros"));
if (carrosSalvos) {
  carros = carrosSalvos;
}

// Carro selecionado atual
let carroSelecionado = localStorage.getItem("carroSelecionado") || 1;

// =====================
// RENDERIZA A LOJA
// =====================
function renderShop() {

  const carList = document.getElementById("carList");
  carList.innerHTML = "";

  const melhorKm = getMelhorKm(); // recorde salvo

  carros.forEach(carro => {
    const div = document.createElement("div");
    div.classList.add("carItem");

    const desbloqueado = melhorKm >= carro.kmNecessario;

    let btnTexto = "Comprar";
    if (carro.comprado) {
      btnTexto = (carroSelecionado == carro.id) ? "Selecionado" : "Selecionar";
    }

    div.innerHTML = `
      <img src="src/assets/images/PlayerCars/${carro.prefix}-${carro.id}.png" 
           alt="${carro.nome}" class="carImg">
      <h4 class="label">${carro.nome}</h4>
      <p class="label">Preço: ${carro.preco} 🪙</p>
      <p class="label">Desbloqueia com ${carro.kmNecessario} km</p>
      <button class="btns"
        ${!desbloqueado ? "disabled" : ""}
        onclick="comprarCarro(${carro.id})">
        ${btnTexto}
      </button>
    `;

    carList.appendChild(div);
  });
}


// =====================
// COMPRAR CARRO
// =====================
function comprarCarro(id) {
  const carro = carros.find(c => c.id === id);
  const melhorKm = getMelhorKm();

  if (carro.comprado) {
    selecionarCarro(carro);
    return;
  }

  if (moedasJogador >= carro.preco && melhorKm >= carro.kmNecessario) {
    moedasJogador -= carro.preco;
    carro.comprado = true;

    localStorage.setItem("carros", JSON.stringify(carros));
    localStorage.setItem("moedas", moedasJogador);

    atualizarMoedasUI();
    renderShop();
    alert(`Você comprou o ${carro.nome}!`);
  } else {
    alert("Você não tem moedas suficientes!");
  }
}


// =====================
// SELECIONAR CARRO
// =====================
function selecionarCarro(carro) {
  carroSelecionado = carro.id;
  localStorage.setItem("carroSelecionado", carro.id);
  renderShop();
  alert(`${carro.nome} selecionado!`);
}
