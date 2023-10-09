import { lettersData } from "../../constants/board";
import attachPieceToHouse from "./attachPieceToHouse";
import { checkEnemies } from "./checkEnemies";

const movePawn = (letterPos, numberPos, type = "pawn", color) => {
  let step = numberPos === 2 ? 2 : 1;

  if (color === "black") {
    step = numberPos === 7 ? 2 : 1;
  }

  for (let i = 1; i <= step; i++) {
    let yPosStep = numberPos + i;

    if (color === "black") {
      yPosStep = numberPos - i;
    }

    attachPieceToHouse(lettersData[letterPos], yPosStep, "pawn", color);
  }

  checkEnemies(numberPos, letterPos, color);
};

const diagonally = (letterPos, numberPos, piece = "bishop", color) => {
  const active = { top: true, bottom: true };

  for (let i = 1; i < lettersData.length - 2; i++) {
    if (!active.top && !active.bottom) break;
    if (active.top)
      active.top = attachPieceToHouse(
        lettersData[letterPos + i],
        numberPos + i,
        piece,
        color,
      );

    if (active.bottom)
      active.bottom = attachPieceToHouse(
        lettersData[letterPos + i],
        numberPos - i,
        piece,
        color,
      );
  }

  active.top = true;
  active.bottom = true;
  let currentYPos = 1;
  for (let i = letterPos - 1; i >= 0; i--) {
    if (!active.top && !active.bottom) break;
    if (active.top)
      active.top = attachPieceToHouse(
        lettersData[i],
        numberPos + currentYPos,
        piece,
        color,
      );

    if (active.bottom && numberPos > 1)
      active.bottom = attachPieceToHouse(
        lettersData[i],
        numberPos - currentYPos,
        piece,
        color,
      );

    currentYPos++;
  }
};

const straight = (letterPos, numberPos, piece = "rook", color = "white") => {
  const active = { top: true, bottom: true };
  for (let i = 1; i < lettersData.length - 1; i++) {
    if (!active.top && !active.bottom) break;
    if (active.top)
      active.top = attachPieceToHouse(
        lettersData[letterPos + i],
        numberPos,
        piece,
        color,
      );

    if (active.bottom) {
      active.bottom = attachPieceToHouse(
        lettersData[letterPos - i],
        numberPos,
        piece,
        color,
      );
    }
  }

  active.top = true;
  active.bottom = true;

  for (let i = 0; i < 8; i++) {
    if (!active.top && !active.bottom) break;
    if (active.top)
      active.top = attachPieceToHouse(
        lettersData[letterPos],
        numberPos + 1 + i,
        piece,
        color,
      );

    if (active.bottom)
      active.bottom = attachPieceToHouse(
        lettersData[letterPos],
        numberPos - 1 - i,
        piece,
        color,
      );
  }
};

const lShape = (letterPos, numberPos, type, color) => {
  const defaultMove = (invert = false) => {
    const def = invert ? -1 : 1;

    attachPieceToHouse(
      lettersData[letterPos + 1 * def],
      numberPos + 2,
      "knight",
      color,
    );
    attachPieceToHouse(
      lettersData[letterPos + 1 * def],
      numberPos - 2,
      "knight",
      color,
    );
    attachPieceToHouse(
      lettersData[letterPos + 2 * def],
      numberPos + 1,
      "knight",
      color,
    );
    attachPieceToHouse(
      lettersData[letterPos + 2 * def],
      numberPos - 1,
      "knight",
      color,
    );
  };

  defaultMove();
  defaultMove(true);
};

const moveKing = (letterPos, numberPos, piece = "king", color) => {
  const active = { top: true, bottom: true };
  for (let i = 2; i < lettersData.length - 1; i++) {
    if (!active.top && !active.bottom) break;
    if (active.top)
      active.top = attachPieceToHouse(
        lettersData[letterPos + 1],
        numberPos,
        piece,
        color,
      );

    if (active.bottom) {
      active.bottom = attachPieceToHouse(
        lettersData[letterPos - 1],
        numberPos,
        piece,
        color,
      );
    }
  }
  active.top = true;
  active.bottom = true;

  for (let i = 1; i < 2; i++) {
    if (!active.top && !active.bottom) break;
    if (active.top)
      active.top = attachPieceToHouse(
        lettersData[letterPos],
        numberPos + i,
        piece,
        color,
      );

    if (active.bottom)
      active.bottom = attachPieceToHouse(
        lettersData[letterPos],
        numberPos - i,
        piece,
        color,
      );
  }

  for (let i = 1; i < lettersData.length - 2; i++) {
    if (!active.top && !active.bottom) break;
    if (active.top)
      active.top = attachPieceToHouse(
        lettersData[letterPos + 1],
        numberPos + 1,
        piece,
        color,
      );

    if (active.bottom)
      active.bottom = attachPieceToHouse(
        lettersData[letterPos + 1],
        numberPos - 1,
        piece,
        color,
      );
  }

  active.top = true;
  active.bottom = true;

  for (let i = letterPos - 1; i >= 0; i--) {
    if (!active.top && !active.bottom) break;
    if (active.top)
      active.top = attachPieceToHouse(
        lettersData[i],
        numberPos + 1,
        piece,
        color,
      );

    if (active.bottom && numberPos > 1)
      active.bottom = attachPieceToHouse(
        lettersData[i],
        numberPos - 1,
        piece,
        color,
      );
    i = 0;
  }
};

export default {
  diagonally,
  straight,
  lShape,
  rook: [straight],
  bishop: [diagonally],
  knight: [lShape],
  queen: [straight, diagonally],
  king: [moveKing],
  pawn: [movePawn],
};
