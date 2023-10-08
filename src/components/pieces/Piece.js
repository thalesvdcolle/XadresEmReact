import { lettersData } from "../../constants/board";
import { pieceIcons } from "../../constants/icons";
import Timer from "../../stores/Timer";
import move from "../../utils/helpers/move";
import ChessBoard from "../ChessBoard";
import ChessPieces from "../ChessPieces";

class Piece {
  piece = document.createElement("button");
  house;
  color;
  type;
  pos;

  constructor(pieceItem) {
    const { element, y, x, pos } = pieceItem.house;
    this.type = pieceItem.type;
    this.piece.id = `piece-${pos}`;
    this.pos = pos;
    this.house = element;
    console.log(this.houseElement);
    this.color = pieceItem.color;
    this.piece.className = `piece ${this.color}`;
    this.piece.innerHTML = ` <img src="${
      pieceIcons[pieceItem.type]
    }" width="80px" />`;

    ChessBoard.movePieceToPosition(this.piece, pieceItem.house.pos, true);

    this.piece.onfocus = this.onFocus.bind(this);
    this.piece.onclick = this.onClick.bind(this);
    this.piece.onblur = this.onBlur.bind(this);
  }

  onFocus(e) {
    // if (!Timer.gameStarted) {
    //   if (this.color === "black") return;
    //   Timer.gameStarted = true;
    //   Timer.startTimer("white");
    // }
    if (Timer.currentActiveTimer !== this.color) return;

    if (!Timer.gameStarted && this.color === Timer.currentActiveTimer) {
      Timer.startTimer(this.color);
      Timer.gameStarted = true;
    }

    this.house.classList.add("active");
    ChessPieces.currentFocusedPiece = e.target.id.split("-")[1];

    const id = e.target.id.split("-")[1];
    const xPos = lettersData.indexOf(id[0]);
    const yPos = Number(id[1]);

    console.log(move[this.type], move, this.type, xPos, yPos);

    move[this.type].forEach((fn) => {
      fn(xPos, yPos, this.type, this.color);
    });
  }

  onClick(e) {
    if (e.target.hasFocus) {
      e.target.blur();
    }
  }

  onBlur(e) {
    const currentActivePositions = document.querySelectorAll(".active");
    currentActivePositions.forEach((position) =>
      position.classList.remove("active")
    );

    const currentEnemyPositions = document.querySelectorAll(".enemy");

    currentEnemyPositions.forEach((position) =>
      position.classList.remove("enemy")
    );
  }
}

export default Piece;
