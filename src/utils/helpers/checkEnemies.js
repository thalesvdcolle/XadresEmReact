import ChessBoard from "../../components/ChessBoard";
import ChessPieces from "../../components/ChessPieces";
import { lettersData } from "../../constants/board";

const checkEnemies = (yPos, xPos, color) => {
  let checkY = yPos + 1;
  const enemy = color === "black" ? "white" : "black";
  if (color === "black") checkY = yPos - 1;

  const leftPos = `${lettersData[xPos - 1]}${checkY}`;
  const rightPos = `${lettersData[xPos + 1]}${checkY}`;

  if (ChessBoard.piecesPositions[leftPos]?.className?.includes(enemy)) {
    const element = ChessBoard.positions[leftPos].element;

    element.classList.add("enemy");
    ChessPieces.currentFocusedPiecePossibleEnemies.push(element.id);
  }

  if (ChessBoard.piecesPositions[rightPos]?.className?.includes(enemy)) {
    const element = ChessBoard.positions[rightPos].element;

    element.classList.add("enemy");
    ChessPieces.currentFocusedPiecePossibleEnemies.push(element.id);
  }
};

export { checkEnemies };
