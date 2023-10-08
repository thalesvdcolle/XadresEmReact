import { defaultPositions, lettersData } from "../constants/board";
import ChessBoard from "./ChessBoard";

class ChessLayout {
  static initial = [];

  static createDefaultInitial() {
    //pawns
    ChessLayout.startPawnPositions("white", 2);
    ChessLayout.startPawnPositions("black", 7);

    // knights
    Object.entries(defaultPositions).forEach(([color, colorPositions]) => {
      Object.entries(colorPositions).forEach(([piece, positions]) => {
        console.log(piece, positions);
        ChessLayout.startPiecePositions(color, positions, piece);
      });
    });
  }

  static startPawnPositions = (color, row) =>
    lettersData.map((letter) => {
      const house = ChessBoard.positions[`${letter}${row}`];

      ChessLayout.initial.push({
        house,
        type: "pawn",
        color
      });

      return house;
    });

  static startPiecePositions = (color, positions, type) => {
    positions.forEach((position) => {
      const house = ChessBoard.positions[position];
      ChessLayout.initial.push({
        house,
        type,
        color
      });
    });
  };
}

export default ChessLayout;
