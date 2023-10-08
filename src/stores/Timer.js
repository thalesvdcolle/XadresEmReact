import ChessPieces from "../components/ChessPieces";
import { getCurrentTime } from "../utils/helpers/getTime";

class Timer {
  static currentTime = {
    black: 60 * 100 * 1000,
    white: 60 * 100 * 1000
  };

  static currentActiveTimer = "white";

  static isStarted = {
    white: false,
    black: false
  };

  static gameMode;

  static gameStarted = false;

  static black = document.createElement("span");
  static white = document.createElement("span");

  static addTimers() {
    const app = document.querySelector("#app");

    const blackContainer = document.createElement("div");
    blackContainer.className = "timer black";
    const whiteContainer = document.createElement("div");
    whiteContainer.className = "timer white";

    const blackLabel = document.createElement("span");
    blackLabel.innerText = "Preto: ";

    const whiteLabel = document.createElement("span");
    whiteLabel.innerText = "Branco: ";

    blackContainer.append(blackLabel, Timer.black);
    whiteContainer.append(whiteLabel, Timer.white);
    Timer.black.innerText = getCurrentTime(Timer.currentTime.black);
    Timer.white.innerText = getCurrentTime(Timer.currentTime.white);

    const timerContainer = document.createElement("div");
    timerContainer.className = "timer-container";

    timerContainer.append(blackContainer, whiteContainer);

    app.appendChild(timerContainer);
  }

  static switchTimer = () => {
    Timer.stopTimer(Timer.currentActiveTimer);

    if (Timer.currentActiveTimer === "white") {
      if (Timer.gameMode === "cpu") {
        const cpuOverlay = document.createElement("div");
        cpuOverlay.className = "cpu-overlay";

        const app = document.querySelector("#app");

        app.appendChild(cpuOverlay);

        setTimeout(() => {
          let canMove = false;
          while (!canMove) {
            const selectedCount = Math.floor(Math.random() * 15);
            let currentLookOut = 0;
            let selectedPiece;

            Object.values(ChessPieces.pieces).forEach((piece) => {
              if (piece.color === "black") {
                if (currentLookOut === selectedCount) {
                  console.log(currentLookOut, piece);
                  selectedPiece = piece;
                }
                currentLookOut++;
              }
            });

            console.log("Selected random piece: ", selectedPiece);
            if (selectedPiece?.piece === undefined) continue;
            selectedPiece.piece.focus();

            if (ChessPieces.currentFocusedPiecePossibleEnemies.length > 0) {
              const randomHouse =
                ChessPieces.currentFocusedPiecePossibleEnemies[
                  Math.floor(
                    Math.random() *
                      ChessPieces.currentFocusedPiecePossibleEnemies.length
                  )
                ];
              const randomSelectedHouse = document.querySelector(
                `#${randomHouse}`
              );

              console.log("Random selected house: ", randomSelectedHouse);
              if (randomSelectedHouse) randomSelectedHouse.click();
              cpuOverlay.remove();
              break;
            }

            if (ChessPieces.currentFocusedPiecePossibleMoves.length === 0)
              continue;

            const randomHouse =
              ChessPieces.currentFocusedPiecePossibleMoves[
                Math.floor(
                  Math.random() *
                    ChessPieces.currentFocusedPiecePossibleMoves.length
                )
              ];

            const randomSelectedHouse = document.querySelector(
              `#${randomHouse}`
            );

            if (randomSelectedHouse) randomSelectedHouse.click();

            cpuOverlay.remove();
            canMove = true;
          }
        }, 1000 + Math.random() * 2000);
      }
    }

    Timer.startTimer(Timer.currentActiveTimer === "white" ? "black" : "white");
  };

  static startTimer = (color) => {
    if (Timer.isStarted[color] === true) return;
    Timer.isStarted[color] = true;
    Timer.currentActiveTimer = color;

    const currentInterval = setInterval(() => {
      Timer.currentTime[color] -= 1000;
      Timer[color].innerText = getCurrentTime(Timer.currentTime[color]);

      if (!Timer.isStarted[color]) {
        return clearInterval(currentInterval);
      }
    }, 1000);
  };

  static stopTimer = (color) => {
    Timer.isStarted[color] = false;
  };
}

export default Timer;
