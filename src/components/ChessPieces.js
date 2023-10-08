import { pieceIcons } from "../constants/icons";
import ChessLayout from "./ChessLayout";
import Piece from "./pieces/Piece";

class ChessPieces {
  static pieces = {};
  static currentFocusedPiece;
  static eatenPieces = {
    white: [],
    black: []
  };
  static currentFocusedPiecePossibleMoves = [];
  static currentFocusedPiecePossibleEnemies = [];

  static createChessPieces() {
    ChessLayout.initial.forEach((piece) => {
      const newPiece = new Piece(piece);
      ChessPieces.pieces[newPiece.pos] = newPiece;
    });
  }

  static resetPositions() {
    ChessPieces.currentFocusedPiecePossibleMoves = [];
    ChessPieces.currentFocusedPiecePossibleEnemies = [];
    ChessPieces.currentFocusedPiece = null;
  }

  static pieceEaten(eatenPiece) {
    ChessPieces.eatenPieces[eatenPiece.color].push(eatenPiece);

    const container = document.querySelector(
      `.eaten.container.${eatenPiece.color}`
    );
    const image = document.createElement("img");
    image.className = `${eatenPiece.color}`;
    image.src = pieceIcons[eatenPiece.type];
    image.width = 50;

    if (container) {
      container.appendChild(image);
    }
  }
}

export default ChessPieces;
