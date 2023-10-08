import ChessBoard from "./components/ChessBoard";
import ChessLayout from "./components/ChessLayout";
import ChessPieces from "./components/ChessPieces";
import Timer from "./stores/Timer";
import "./styles.css";

ChessBoard.createMainContainer();
ChessLayout.createDefaultInitial();
ChessPieces.createChessPieces();
Timer.addTimers();

const eatenContainer = document.createElement("div");
eatenContainer.className = "container eaten-pieces";

const blackContainer = document.createElement("div");
blackContainer.className = "eaten container black";

const whiteContainer = document.createElement("div");
whiteContainer.className = "eaten container white";

eatenContainer.append(blackContainer, whiteContainer);

const cpuOverlay = document.createElement("div");
cpuOverlay.className = "cpu-overlay";

const playWithCpuBtn = document.createElement("button");
playWithCpuBtn.className = "cpu-btn";
playWithCpuBtn.innerText = "Jogar com a Maquina";
playWithCpuBtn.onclick = () => {
  Timer.gameMode = "cpu";
  cpuOverlay.remove();
};
const playWithPlayers = document.createElement("button");
playWithPlayers.className = "cpu-btn";
playWithPlayers.innerText = "Jogar com outros Players ";
playWithPlayers.onclick = () => cpuOverlay.remove();

cpuOverlay.append(playWithCpuBtn, playWithPlayers);

const app = document.querySelector("#app");

const movesContainer = document.createElement("div");
movesContainer.className = "moves container closed";

const movesActionBtn = document.createElement("button");
movesActionBtn.innerText = "Abrir Movimentos";

movesActionBtn.onclick = () => movesContainer.classList.toggle("closed");

movesContainer.appendChild(movesActionBtn);

app.append(eatenContainer, movesContainer, cpuOverlay);

console.log(ChessBoard.piecesPositions);
