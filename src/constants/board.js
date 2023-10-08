const lettersData = ["A", "B", "C", "D", "E", "F", "G", "H"];
const numbersData = [1, 2, 3, 4, 5, 6, 7, 8];

const defaultWhitePositions = {
  knight: ["B1", "G1"],
  rook: ["A1", "H1"],
  bishop: ["C1", "F1"],
  queen: ["D1"]
};

const defaultBlackPositions = {
  knight: ["B8", "G8"],
  rook: ["A8", "H8"],
  bishop: ["C8", "F8"],
  queen: ["E8"]
};

const defaultPositions = {
  white: defaultWhitePositions,
  black: defaultBlackPositions
};

export { lettersData, numbersData, defaultPositions };
