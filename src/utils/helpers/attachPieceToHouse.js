import ChessBoard from "../../components/ChessBoard";
import ChessPieces from "../../components/ChessPieces";

const attachPieceToHouse = (x, y, piece = "pawn", color = "white") => {
  const possiblePosition = `${x}${y}`;

  const possibleEnemy = ChessBoard.piecesPositions[possiblePosition];

  if (possibleEnemy !== undefined && possibleEnemy !== null) {
    if (piece !== "pawn" && !possibleEnemy.classList.contains(color)) {
      console.log("Next element is an enemy");
      possibleEnemy.parentNode.classList.toggle("enemy");
      ChessPieces.currentFocusedPiecePossibleEnemies.push(
        possibleEnemy.id.split("-")[1]
      );
    }

    return false;
  }

  const possibleElementPosition = document.querySelector(
    `#${possiblePosition}`
  );

  if (!possiblePosition.includes("undefined") && possibleElementPosition)
    ChessPieces.currentFocusedPiecePossibleMoves.push(possiblePosition);

  if (possibleElementPosition) {
    possibleElementPosition.classList.add("active");
  }

  return true;
};

export default attachPieceToHouse;
