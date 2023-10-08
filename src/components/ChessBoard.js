import { lettersData, numbersData } from "../constants/board";
import Timer from "../stores/Timer";
import ChessPieces from "./ChessPieces";

class ChessBoard {
  static board = document.createElement("div");
  static app = document.querySelector("#app");
  static positions = {};
  static piecesPositions = {};

  static createMainContainer() {
    ChessBoard.app.appendChild(ChessBoard.board);
    ChessBoard.board.className = "board";

    const overlay = document.createElement("div");
    overlay.className = "board-overlay";

    ChessBoard.board.appendChild(overlay);

    let color = 1;
    let row = 0;

    for (let house = 1; house <= 64; house++) {
      const cell = document.createElement("div");

      let isWhite = (house - color) % 2 === 0;

      if (isWhite) {
        cell.className = "cell";
      } else {
        cell.className = "cell odd";
      }

      const currentLetter = lettersData[(house - 1) % 8];
      const currentNumber = numbersData[7 - row];

      cell.setAttribute("data-letter", currentLetter);
      cell.setAttribute("data-number", currentNumber);
      cell.setAttribute("id", `${currentLetter}${currentNumber}`);

      cell.onclick = (e) => {
        if (
          ChessPieces.currentFocusedPiecePossibleEnemies.includes(e.target.id)
        ) {
          const position = ChessPieces.currentFocusedPiece;
          ChessBoard.removePieceFromPosition(
            ChessBoard.piecesPositions[position],
            cell.id
          );
        }

        if (!ChessPieces.currentFocusedPiecePossibleMoves.includes(e.target.id))
          return;

        const position = ChessPieces.currentFocusedPiece;

        ChessBoard.movePieceToPosition(
          ChessBoard.piecesPositions[position],
          cell.id
        );
      };

      ChessBoard.positions[`${currentLetter}${currentNumber}`] = {
        x: currentLetter,
        y: currentNumber,
        element: cell,
        pos: `${currentLetter}${currentNumber}`
      };

      ChessBoard.piecesPositions[`${currentLetter}${currentNumber}`] = null;

      if (house % 8 === 0) {
        color = color === 0 ? 1 : 0;
        row++;
      }

      ChessBoard.board.append(cell);
    }
  }

  static removePieceFromPosition(piece, pos) {
    setTimeout(() => {
      const element = ChessBoard.positions[pos].element;
      const elementToBeRemoved = ChessPieces.pieces[pos];

      ChessPieces.pieceEaten(elementToBeRemoved);

      element.removeChild(element.lastElementChild);

      ChessBoard.movePieceToPosition(piece, pos);
    }, 10);
  }

  static movePieceToPosition(piece, pos, isNew = false) {
    const element = ChessBoard.positions[pos].element;

    setTimeout(() => {
      if (!isNew) {
        const movesContainer = document.querySelector(".moves.container");

        const id = piece.id.split("-")[1];
        ChessPieces.pieces[pos] = ChessPieces.pieces[id];

        const span = document.createElement("span");
        span.className = `${ChessPieces.pieces[id].color}-move`;
        span.innerText = `${id} - ${pos} `;
        movesContainer.append(span);

        delete ChessPieces.pieces[id];
        ChessBoard.piecesPositions[id] = null;
        piece.id = `piece-${pos}`;
      }

      ChessBoard.piecesPositions[pos] = piece;

      element.appendChild(piece);

      console.log("Has game started? ", Timer.gameStarted);

      if (Timer.gameStarted) {
        Timer.switchTimer();
      }

      ChessPieces.resetPositions();
    }, 10);
  }
}

export default ChessBoard;
