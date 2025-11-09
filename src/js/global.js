// @ts-nocheck

// =====================
// ESTADO DO JOGO
// =====================
let gameStarted = false;
let gamePaused = false;
let gameMode = "normal";
let dificuldade = 1; // é usada para aumentar a velocidade  o velocimetro / usado no update coins, gas, e cars de forma que maior a dificuldade menos tempo entre o spwan deles.
let dificuldadeTimer = 0;
let dificuldadeIntervalo = 10;
let spawnInterval = 1;
let spawnTimer = 0;
let difIntervalo = 0;

// =====================
// VELOCIDADE E FÍSICA
// =====================
let velocidadeBase = 60;
let velocidadeMultiplicador = 1;
let velocidadeKmH = 60;

// =====================
// PISTAS E CENÁRIO
// =====================
let numPistas = 7;
let linhaAtual = 0;
let caminhosLivresAtuais = [];

// =====================
// PLAYER
// =====================
let colunaAtual = 5;
let anguloAtual = 0;
let motorSound;
let vol = 0.3;

// =====================
// ITENS E OBJETOS
// =====================
let coinsSpawnadas = [];
let gasSpawnadas = [];
let carrosSpawnados = [];

// =====================
// CONFIG DE SPRITES
// =====================
const alturaCoin = 60;
const alturaGas = 100;
const alturaCarro = 140;
const larguraPista = 200;

// =====================
// AUDIOS
// =====================
const coinSound = new Audio("src/assets/sounds/goldCoinSound.mp3");
coinSound.volume = 0.5;

const gasSound = new Audio("src/assets/sounds/gasSound.mp3");
gasSound.volume = 0.2;

// =====================
// FRAME SEQUENCES
// =====================
const coinFrames = [
  "src/assets/images/Coins/coin1.png",
  "src/assets/images/Coins/coin2.png",
  "src/assets/images/Coins/coin3.png"
];

const gasFrames = [
  "src/assets/images/Gas/gas1.png",
  "src/assets/images/Gas/gas2.png",
  "src/assets/images/Gas/gas3.png"
];

// =====================
// MOEDAS E ECONOMIA
// =====================
let moedasJogador = parseInt(localStorage.getItem("moedas")) || 0;
let moedasRun = 0;

// =====================
// COMBUSTÍVEL
// =====================
let celularFuelBar = document.getElementById("celularFuelBar");
let fuelBar = document.getElementById("fuelBar");
let maxFuel = 30;
let currentFuel = maxFuel;
let kmL = 0.03;

// =====================
// SCORE E RANKING
// =====================
let startTime = 0;
let tempoVivo = 0;
let kmPercorridos = 0;

// =====================
// INTERFACE / ELEMENTOS    
// =====================
const telaGameOver = document.getElementById("gameOver");
const kmFinal = document.getElementById("kmFinal");
const moedasFinal = document.getElementById("moedasFinal");

// =====================
// FUNÇÕES ÚTEIS (globais)
// =====================
function mostrar(el) {
  el.classList.add("flex");
  el.classList.remove("hidden");
}

function esconder(el) {
  el.classList.remove("flex");
  el.classList.add("hidden");
}
