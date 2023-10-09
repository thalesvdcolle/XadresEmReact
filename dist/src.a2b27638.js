// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/constants/board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numbersData = exports.lettersData = exports.defaultPositions = void 0;
var lettersData = exports.lettersData = ["A", "B", "C", "D", "E", "F", "G", "H"];
var numbersData = exports.numbersData = [1, 2, 3, 4, 5, 6, 7, 8];
var defaultWhitePositions = {
  knight: ["B1", "G1"],
  rook: ["A1", "H1"],
  bishop: ["C1", "F1"],
  queen: ["D1"]
};
var defaultBlackPositions = {
  knight: ["B8", "G8"],
  rook: ["A8", "H8"],
  bishop: ["C8", "F8"],
  queen: ["E8"]
};
var defaultPositions = exports.defaultPositions = {
  white: defaultWhitePositions,
  black: defaultBlackPositions
};
},{}],"src/constants/icons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pieceIcons = void 0;
var pieceIcons = exports.pieceIcons = {
  bishop: "https://static.thenounproject.com/png/1357377-200.png",
  knight: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/BLACK_CHESS_KNIGHT-ROOK.svg/2048px-BLACK_CHESS_KNIGHT-ROOK.svg.png",
  pawn: "https://static.thenounproject.com/png/4173288-200.png",
  rook: "https://freesvg.org/img/portablejim-Chess-tile-Rook-1.png",
  queen: "https://cdn2.iconfinder.com/data/icons/chess-pieces-1/500/Chess-Icons-Expanded-11-512.png"
};
},{}],"src/components/ChessLayout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _board = require("../constants/board");
var _ChessBoard = _interopRequireDefault(require("./ChessBoard"));
var _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ChessLayout = /*#__PURE__*/function () {
  function ChessLayout() {
    _classCallCheck(this, ChessLayout);
  }
  _createClass(ChessLayout, null, [{
    key: "createDefaultInitial",
    value: function createDefaultInitial() {
      //pawns
      ChessLayout.startPawnPositions("white", 2);
      ChessLayout.startPawnPositions("black", 7);

      // knights
      Object.entries(_board.defaultPositions).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          color = _ref2[0],
          colorPositions = _ref2[1];
        Object.entries(colorPositions).forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
            piece = _ref4[0],
            positions = _ref4[1];
          console.log(piece, positions);
          ChessLayout.startPiecePositions(color, positions, piece);
        });
      });
    }
  }]);
  return ChessLayout;
}();
_class = ChessLayout;
_defineProperty(ChessLayout, "initial", []);
_defineProperty(ChessLayout, "startPawnPositions", function (color, row) {
  return _board.lettersData.map(function (letter) {
    var house = _ChessBoard.default.positions["".concat(letter).concat(row)];
    _class.initial.push({
      house: house,
      type: "pawn",
      color: color
    });
    return house;
  });
});
_defineProperty(ChessLayout, "startPiecePositions", function (color, positions, type) {
  positions.forEach(function (position) {
    var house = _ChessBoard.default.positions[position];
    _class.initial.push({
      house: house,
      type: type,
      color: color
    });
  });
});
var _default = exports.default = ChessLayout;
},{"../constants/board":"src/constants/board.js","./ChessBoard":"src/components/ChessBoard.js"}],"src/utils/helpers/attachPieceToHouse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ChessBoard = _interopRequireDefault(require("../../components/ChessBoard"));
var _ChessPieces = _interopRequireDefault(require("../../components/ChessPieces"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var attachPieceToHouse = function attachPieceToHouse(x, y) {
  var piece = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "pawn";
  var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "white";
  var possiblePosition = "".concat(x).concat(y);
  var possibleEnemy = _ChessBoard.default.piecesPositions[possiblePosition];
  if (possibleEnemy !== undefined && possibleEnemy !== null) {
    if (piece !== "pawn" && !possibleEnemy.classList.contains(color)) {
      console.log("Next element is an enemy");
      possibleEnemy.parentNode.classList.toggle("enemy");
      _ChessPieces.default.currentFocusedPiecePossibleEnemies.push(possibleEnemy.id.split("-")[1]);
    }
    return false;
  }
  var possibleElementPosition = document.querySelector("#".concat(possiblePosition));
  if (!possiblePosition.includes("undefined") && possibleElementPosition) _ChessPieces.default.currentFocusedPiecePossibleMoves.push(possiblePosition);
  if (possibleElementPosition) {
    possibleElementPosition.classList.add("active");
  }
  return true;
};
var _default = exports.default = attachPieceToHouse;
},{"../../components/ChessBoard":"src/components/ChessBoard.js","../../components/ChessPieces":"src/components/ChessPieces.js"}],"src/utils/helpers/checkEnemies.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkEnemies = void 0;
var _ChessBoard = _interopRequireDefault(require("../../components/ChessBoard"));
var _ChessPieces = _interopRequireDefault(require("../../components/ChessPieces"));
var _board = require("../../constants/board");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var checkEnemies = exports.checkEnemies = function checkEnemies(yPos, xPos, color) {
  var _ChessBoard$piecesPos, _ChessBoard$piecesPos2, _ChessBoard$piecesPos3, _ChessBoard$piecesPos4;
  var checkY = yPos + 1;
  var enemy = color === "black" ? "white" : "black";
  if (color === "black") checkY = yPos - 1;
  var leftPos = "".concat(_board.lettersData[xPos - 1]).concat(checkY);
  var rightPos = "".concat(_board.lettersData[xPos + 1]).concat(checkY);
  if ((_ChessBoard$piecesPos = _ChessBoard.default.piecesPositions[leftPos]) !== null && _ChessBoard$piecesPos !== void 0 && (_ChessBoard$piecesPos2 = _ChessBoard$piecesPos.className) !== null && _ChessBoard$piecesPos2 !== void 0 && _ChessBoard$piecesPos2.includes(enemy)) {
    var element = _ChessBoard.default.positions[leftPos].element;
    element.classList.add("enemy");
    _ChessPieces.default.currentFocusedPiecePossibleEnemies.push(element.id);
  }
  if ((_ChessBoard$piecesPos3 = _ChessBoard.default.piecesPositions[rightPos]) !== null && _ChessBoard$piecesPos3 !== void 0 && (_ChessBoard$piecesPos4 = _ChessBoard$piecesPos3.className) !== null && _ChessBoard$piecesPos4 !== void 0 && _ChessBoard$piecesPos4.includes(enemy)) {
    var _element = _ChessBoard.default.positions[rightPos].element;
    _element.classList.add("enemy");
    _ChessPieces.default.currentFocusedPiecePossibleEnemies.push(_element.id);
  }
};
},{"../../components/ChessBoard":"src/components/ChessBoard.js","../../components/ChessPieces":"src/components/ChessPieces.js","../../constants/board":"src/constants/board.js"}],"src/utils/helpers/move.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _board = require("../../constants/board");
var _attachPieceToHouse = _interopRequireDefault(require("./attachPieceToHouse"));
var _checkEnemies = require("./checkEnemies");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var movePawn = function movePawn(letterPos, numberPos) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "pawn";
  var color = arguments.length > 3 ? arguments[3] : undefined;
  var step = numberPos === 2 ? 2 : 1;
  if (color === "black") {
    step = numberPos === 7 ? 2 : 1;
  }
  for (var i = 1; i <= step; i++) {
    var yPosStep = numberPos + i;
    if (color === "black") {
      yPosStep = numberPos - i;
    }
    (0, _attachPieceToHouse.default)(_board.lettersData[letterPos], yPosStep, "pawn", color);
  }
  (0, _checkEnemies.checkEnemies)(numberPos, letterPos, color);
};
var diagonally = function diagonally(letterPos, numberPos) {
  var piece = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "bishop";
  var color = arguments.length > 3 ? arguments[3] : undefined;
  var active = {
    top: true,
    bottom: true
  };
  for (var i = 1; i < _board.lettersData.length - 2; i++) {
    if (!active.top && !active.bottom) break;
    if (active.top) active.top = (0, _attachPieceToHouse.default)(_board.lettersData[letterPos + i], numberPos + i, piece, color);
    if (active.bottom) active.bottom = (0, _attachPieceToHouse.default)(_board.lettersData[letterPos + i], numberPos - i, piece, color);
  }
  active.top = true;
  active.bottom = true;
  var currentYPos = 1;
  for (var _i = letterPos - 1; _i >= 0; _i--) {
    if (!active.top && !active.bottom) break;
    if (active.top) active.top = (0, _attachPieceToHouse.default)(_board.lettersData[_i], numberPos + currentYPos, piece, color);
    if (active.bottom && numberPos > 1) active.bottom = (0, _attachPieceToHouse.default)(_board.lettersData[_i], numberPos - currentYPos, piece, color);
    currentYPos++;
  }
};
var straight = function straight(letterPos, numberPos) {
  var piece = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "rook";
  var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "white";
  var active = {
    top: true,
    bottom: true
  };
  for (var i = 1; i < _board.lettersData.length - 1; i++) {
    if (!active.top && !active.bottom) break;
    if (active.top) active.top = (0, _attachPieceToHouse.default)(_board.lettersData[letterPos + i], numberPos, piece, color);
    if (active.bottom) {
      active.bottom = (0, _attachPieceToHouse.default)(_board.lettersData[letterPos - i], numberPos, piece, color);
    }
  }
  active.top = true;
  active.bottom = true;
  for (var _i2 = 0; _i2 < 8; _i2++) {
    if (!active.top && !active.bottom) break;
    if (active.top) active.top = (0, _attachPieceToHouse.default)(_board.lettersData[letterPos], numberPos + 1 + _i2, piece, color);
    if (active.bottom) active.bottom = (0, _attachPieceToHouse.default)(_board.lettersData[letterPos], numberPos - 1 - _i2, piece, color);
  }
};
var lShape = function lShape(letterPos, numberPos, type, color) {
  var defaultMove = function defaultMove() {
    var invert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var def = invert ? -1 : 1;
    (0, _attachPieceToHouse.default)(_board.lettersData[letterPos + 1 * def], numberPos + 2, "knight", color);
    (0, _attachPieceToHouse.default)(_board.lettersData[letterPos + 1 * def], numberPos - 2, "knight", color);
    (0, _attachPieceToHouse.default)(_board.lettersData[letterPos + 2 * def], numberPos + 1, "knight", color);
    (0, _attachPieceToHouse.default)(_board.lettersData[letterPos + 2 * def], numberPos - 1, "knight", color);
  };
  defaultMove();
  defaultMove(true);
};
var _default = exports.default = {
  diagonally: diagonally,
  straight: straight,
  lShape: lShape,
  rook: [straight],
  bishop: [diagonally],
  knight: [lShape],
  queen: [straight, diagonally],
  pawn: [movePawn]
};
},{"../../constants/board":"src/constants/board.js","./attachPieceToHouse":"src/utils/helpers/attachPieceToHouse.js","./checkEnemies":"src/utils/helpers/checkEnemies.js"}],"src/components/pieces/Piece.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _board = require("../../constants/board");
var _icons = require("../../constants/icons");
var _Timer = _interopRequireDefault(require("../../stores/Timer"));
var _move = _interopRequireDefault(require("../../utils/helpers/move"));
var _ChessBoard = _interopRequireDefault(require("../ChessBoard"));
var _ChessPieces = _interopRequireDefault(require("../ChessPieces"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Piece = /*#__PURE__*/function () {
  function Piece(pieceItem) {
    _classCallCheck(this, Piece);
    _defineProperty(this, "piece", document.createElement("button"));
    _defineProperty(this, "house", void 0);
    _defineProperty(this, "color", void 0);
    _defineProperty(this, "type", void 0);
    _defineProperty(this, "pos", void 0);
    var _pieceItem$house = pieceItem.house,
      element = _pieceItem$house.element,
      y = _pieceItem$house.y,
      x = _pieceItem$house.x,
      pos = _pieceItem$house.pos;
    this.type = pieceItem.type;
    this.piece.id = "piece-".concat(pos);
    this.pos = pos;
    this.house = element;
    console.log(this.houseElement);
    this.color = pieceItem.color;
    this.piece.className = "piece ".concat(this.color);
    this.piece.innerHTML = " <img src=\"".concat(_icons.pieceIcons[pieceItem.type], "\" width=\"80px\" />");
    _ChessBoard.default.movePieceToPosition(this.piece, pieceItem.house.pos, true);
    this.piece.onfocus = this.onFocus.bind(this);
    this.piece.onclick = this.onClick.bind(this);
    this.piece.onblur = this.onBlur.bind(this);
  }
  _createClass(Piece, [{
    key: "onFocus",
    value: function onFocus(e) {
      var _this = this;
      // if (!Timer.gameStarted) {
      //   if (this.color === "black") return;
      //   Timer.gameStarted = true;
      //   Timer.startTimer("white");
      // }
      if (_Timer.default.currentActiveTimer !== this.color) return;
      if (!_Timer.default.gameStarted && this.color === _Timer.default.currentActiveTimer) {
        _Timer.default.startTimer(this.color);
        _Timer.default.gameStarted = true;
      }
      this.house.classList.add("active");
      _ChessPieces.default.currentFocusedPiece = e.target.id.split("-")[1];
      var id = e.target.id.split("-")[1];
      var xPos = _board.lettersData.indexOf(id[0]);
      var yPos = Number(id[1]);
      console.log(_move.default[this.type], _move.default, this.type, xPos, yPos);
      _move.default[this.type].forEach(function (fn) {
        fn(xPos, yPos, _this.type, _this.color);
      });
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      if (e.target.hasFocus) {
        e.target.blur();
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      var currentActivePositions = document.querySelectorAll(".active");
      currentActivePositions.forEach(function (position) {
        return position.classList.remove("active");
      });
      var currentEnemyPositions = document.querySelectorAll(".enemy");
      currentEnemyPositions.forEach(function (position) {
        return position.classList.remove("enemy");
      });
    }
  }]);
  return Piece;
}();
var _default = exports.default = Piece;
},{"../../constants/board":"src/constants/board.js","../../constants/icons":"src/constants/icons.js","../../stores/Timer":"src/stores/Timer.js","../../utils/helpers/move":"src/utils/helpers/move.js","../ChessBoard":"src/components/ChessBoard.js","../ChessPieces":"src/components/ChessPieces.js"}],"src/components/ChessPieces.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _icons = require("../constants/icons");
var _ChessLayout = _interopRequireDefault(require("./ChessLayout"));
var _Piece = _interopRequireDefault(require("./pieces/Piece"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ChessPieces = /*#__PURE__*/function () {
  function ChessPieces() {
    _classCallCheck(this, ChessPieces);
  }
  _createClass(ChessPieces, null, [{
    key: "createChessPieces",
    value: function createChessPieces() {
      _ChessLayout.default.initial.forEach(function (piece) {
        var newPiece = new _Piece.default(piece);
        ChessPieces.pieces[newPiece.pos] = newPiece;
      });
    }
  }, {
    key: "resetPositions",
    value: function resetPositions() {
      ChessPieces.currentFocusedPiecePossibleMoves = [];
      ChessPieces.currentFocusedPiecePossibleEnemies = [];
      ChessPieces.currentFocusedPiece = null;
    }
  }, {
    key: "pieceEaten",
    value: function pieceEaten(eatenPiece) {
      ChessPieces.eatenPieces[eatenPiece.color].push(eatenPiece);
      var container = document.querySelector(".eaten.container.".concat(eatenPiece.color));
      var image = document.createElement("img");
      image.className = "".concat(eatenPiece.color);
      image.src = _icons.pieceIcons[eatenPiece.type];
      image.width = 50;
      if (container) {
        container.appendChild(image);
      }
    }
  }]);
  return ChessPieces;
}();
_defineProperty(ChessPieces, "pieces", {});
_defineProperty(ChessPieces, "currentFocusedPiece", void 0);
_defineProperty(ChessPieces, "eatenPieces", {
  white: [],
  black: []
});
_defineProperty(ChessPieces, "currentFocusedPiecePossibleMoves", []);
_defineProperty(ChessPieces, "currentFocusedPiecePossibleEnemies", []);
var _default = exports.default = ChessPieces;
},{"../constants/icons":"src/constants/icons.js","./ChessLayout":"src/components/ChessLayout.js","./pieces/Piece":"src/components/pieces/Piece.js"}],"src/utils/helpers/getTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentTime = void 0;
var getCurrentTime = exports.getCurrentTime = function getCurrentTime(time) {
  var minutes = new Date(time).getMinutes();
  var seconds = new Date(time).getSeconds();
  return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
};
},{}],"src/stores/Timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ChessPieces = _interopRequireDefault(require("../components/ChessPieces"));
var _getTime = require("../utils/helpers/getTime");
var _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Timer = /*#__PURE__*/function () {
  function Timer() {
    _classCallCheck(this, Timer);
  }
  _createClass(Timer, null, [{
    key: "addTimers",
    value: function addTimers() {
      var app = document.querySelector("#app");
      var blackContainer = document.createElement("div");
      blackContainer.className = "timer black";
      var whiteContainer = document.createElement("div");
      whiteContainer.className = "timer white";
      var blackLabel = document.createElement("span");
      blackLabel.innerText = "Preto: ";
      var whiteLabel = document.createElement("span");
      whiteLabel.innerText = "Branco: ";
      blackContainer.append(blackLabel, Timer.black);
      whiteContainer.append(whiteLabel, Timer.white);
      Timer.black.innerText = (0, _getTime.getCurrentTime)(Timer.currentTime.black);
      Timer.white.innerText = (0, _getTime.getCurrentTime)(Timer.currentTime.white);
      var timerContainer = document.createElement("div");
      timerContainer.className = "timer-container";
      timerContainer.append(blackContainer, whiteContainer);
      app.appendChild(timerContainer);
    }
  }]);
  return Timer;
}();
_class = Timer;
_defineProperty(Timer, "currentTime", {
  black: 60 * 100 * 1000,
  white: 60 * 100 * 1000
});
_defineProperty(Timer, "currentActiveTimer", "white");
_defineProperty(Timer, "isStarted", {
  white: false,
  black: false
});
_defineProperty(Timer, "gameMode", void 0);
_defineProperty(Timer, "gameStarted", false);
_defineProperty(Timer, "black", document.createElement("span"));
_defineProperty(Timer, "white", document.createElement("span"));
_defineProperty(Timer, "switchTimer", function () {
  _class.stopTimer(_class.currentActiveTimer);
  if (_class.currentActiveTimer === "white") {
    if (_class.gameMode === "cpu") {
      var cpuOverlay = document.createElement("div");
      cpuOverlay.className = "cpu-overlay";
      var app = document.querySelector("#app");
      app.appendChild(cpuOverlay);
      setTimeout(function () {
        var canMove = false;
        var _loop = function _loop() {
            var _selectedPiece;
            var selectedCount = Math.floor(Math.random() * 15);
            var currentLookOut = 0;
            var selectedPiece;
            Object.values(_ChessPieces.default.pieces).forEach(function (piece) {
              if (piece.color === "black") {
                if (currentLookOut === selectedCount) {
                  console.log(currentLookOut, piece);
                  selectedPiece = piece;
                }
                currentLookOut++;
              }
            });
            console.log("Selected random piece: ", selectedPiece);
            if (((_selectedPiece = selectedPiece) === null || _selectedPiece === void 0 ? void 0 : _selectedPiece.piece) === undefined) return 0; // continue
            selectedPiece.piece.focus();
            if (_ChessPieces.default.currentFocusedPiecePossibleEnemies.length > 0) {
              var _randomHouse = _ChessPieces.default.currentFocusedPiecePossibleEnemies[Math.floor(Math.random() * _ChessPieces.default.currentFocusedPiecePossibleEnemies.length)];
              var _randomSelectedHouse = document.querySelector("#".concat(_randomHouse));
              console.log("Random selected house: ", _randomSelectedHouse);
              if (_randomSelectedHouse) _randomSelectedHouse.click();
              cpuOverlay.remove();
              return 1; // break
            }
            if (_ChessPieces.default.currentFocusedPiecePossibleMoves.length === 0) return 0; // continue
            var randomHouse = _ChessPieces.default.currentFocusedPiecePossibleMoves[Math.floor(Math.random() * _ChessPieces.default.currentFocusedPiecePossibleMoves.length)];
            var randomSelectedHouse = document.querySelector("#".concat(randomHouse));
            if (randomSelectedHouse) randomSelectedHouse.click();
            cpuOverlay.remove();
            canMove = true;
          },
          _ret;
        while (!canMove) {
          _ret = _loop();
          if (_ret === 0) continue;
          if (_ret === 1) break;
        }
      }, 1000 + Math.random() * 2000);
    }
  }
  _class.startTimer(_class.currentActiveTimer === "white" ? "black" : "white");
});
_defineProperty(Timer, "startTimer", function (color) {
  if (_class.isStarted[color] === true) return;
  _class.isStarted[color] = true;
  _class.currentActiveTimer = color;
  var currentInterval = setInterval(function () {
    _class.currentTime[color] -= 1000;
    _class[color].innerText = (0, _getTime.getCurrentTime)(_class.currentTime[color]);
    if (!_class.isStarted[color]) {
      return clearInterval(currentInterval);
    }
  }, 1000);
});
_defineProperty(Timer, "stopTimer", function (color) {
  _class.isStarted[color] = false;
});
var _default = exports.default = Timer;
},{"../components/ChessPieces":"src/components/ChessPieces.js","../utils/helpers/getTime":"src/utils/helpers/getTime.js"}],"src/components/ChessBoard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _board = require("../constants/board");
var _Timer = _interopRequireDefault(require("../stores/Timer"));
var _ChessPieces = _interopRequireDefault(require("./ChessPieces"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ChessBoard = /*#__PURE__*/function () {
  function ChessBoard() {
    _classCallCheck(this, ChessBoard);
  }
  _createClass(ChessBoard, null, [{
    key: "createMainContainer",
    value: function createMainContainer() {
      ChessBoard.app.appendChild(ChessBoard.board);
      ChessBoard.board.className = "board";
      var overlay = document.createElement("div");
      overlay.className = "board-overlay";
      ChessBoard.board.appendChild(overlay);
      var color = 1;
      var row = 0;
      var _loop = function _loop() {
        var cell = document.createElement("div");
        var isWhite = (house - color) % 2 === 0;
        if (isWhite) {
          cell.className = "cell";
        } else {
          cell.className = "cell odd";
        }
        var currentLetter = _board.lettersData[(house - 1) % 8];
        var currentNumber = _board.numbersData[7 - row];
        cell.setAttribute("data-letter", currentLetter);
        cell.setAttribute("data-number", currentNumber);
        cell.setAttribute("id", "".concat(currentLetter).concat(currentNumber));
        cell.onclick = function (e) {
          if (_ChessPieces.default.currentFocusedPiecePossibleEnemies.includes(e.target.id)) {
            var _position = _ChessPieces.default.currentFocusedPiece;
            ChessBoard.removePieceFromPosition(ChessBoard.piecesPositions[_position], cell.id);
          }
          if (!_ChessPieces.default.currentFocusedPiecePossibleMoves.includes(e.target.id)) return;
          var position = _ChessPieces.default.currentFocusedPiece;
          ChessBoard.movePieceToPosition(ChessBoard.piecesPositions[position], cell.id);
        };
        ChessBoard.positions["".concat(currentLetter).concat(currentNumber)] = {
          x: currentLetter,
          y: currentNumber,
          element: cell,
          pos: "".concat(currentLetter).concat(currentNumber)
        };
        ChessBoard.piecesPositions["".concat(currentLetter).concat(currentNumber)] = null;
        if (house % 8 === 0) {
          color = color === 0 ? 1 : 0;
          row++;
        }
        ChessBoard.board.append(cell);
      };
      for (var house = 1; house <= 64; house++) {
        _loop();
      }
    }
  }, {
    key: "removePieceFromPosition",
    value: function removePieceFromPosition(piece, pos) {
      setTimeout(function () {
        var element = ChessBoard.positions[pos].element;
        var elementToBeRemoved = _ChessPieces.default.pieces[pos];
        _ChessPieces.default.pieceEaten(elementToBeRemoved);
        element.removeChild(element.lastElementChild);
        ChessBoard.movePieceToPosition(piece, pos);
      }, 10);
    }
  }, {
    key: "movePieceToPosition",
    value: function movePieceToPosition(piece, pos) {
      var isNew = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var element = ChessBoard.positions[pos].element;
      setTimeout(function () {
        if (!isNew) {
          var movesContainer = document.querySelector(".moves.container");
          var id = piece.id.split("-")[1];
          _ChessPieces.default.pieces[pos] = _ChessPieces.default.pieces[id];
          var span = document.createElement("span");
          span.className = "".concat(_ChessPieces.default.pieces[id].color, "-move");
          span.innerText = "".concat(id, " - ").concat(pos, " ");
          movesContainer.append(span);
          delete _ChessPieces.default.pieces[id];
          ChessBoard.piecesPositions[id] = null;
          piece.id = "piece-".concat(pos);
        }
        ChessBoard.piecesPositions[pos] = piece;
        element.appendChild(piece);
        console.log("Has game started? ", _Timer.default.gameStarted);
        if (_Timer.default.gameStarted) {
          _Timer.default.switchTimer();
        }
        _ChessPieces.default.resetPositions();
      }, 10);
    }
  }]);
  return ChessBoard;
}();
_defineProperty(ChessBoard, "board", document.createElement("div"));
_defineProperty(ChessBoard, "app", document.querySelector("#app"));
_defineProperty(ChessBoard, "positions", {});
_defineProperty(ChessBoard, "piecesPositions", {});
var _default = exports.default = ChessBoard;
},{"../constants/board":"src/constants/board.js","../stores/Timer":"src/stores/Timer.js","./ChessPieces":"src/components/ChessPieces.js"}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _ChessBoard = _interopRequireDefault(require("./components/ChessBoard"));
var _ChessLayout = _interopRequireDefault(require("./components/ChessLayout"));
var _ChessPieces = _interopRequireDefault(require("./components/ChessPieces"));
var _Timer = _interopRequireDefault(require("./stores/Timer"));
require("./styles.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_ChessBoard.default.createMainContainer();
_ChessLayout.default.createDefaultInitial();
_ChessPieces.default.createChessPieces();
_Timer.default.addTimers();
var eatenContainer = document.createElement("div");
eatenContainer.className = "container eaten-pieces";
var blackContainer = document.createElement("div");
blackContainer.className = "eaten container black";
var whiteContainer = document.createElement("div");
whiteContainer.className = "eaten container white";
eatenContainer.append(blackContainer, whiteContainer);
var cpuOverlay = document.createElement("div");
cpuOverlay.className = "cpu-overlay";
var playWithCpuBtn = document.createElement("button");
playWithCpuBtn.className = "cpu-btn";
playWithCpuBtn.innerText = "Jogar com a Maquina";
playWithCpuBtn.onclick = function () {
  _Timer.default.gameMode = "cpu";
  cpuOverlay.remove();
};
var playWithPlayers = document.createElement("button");
playWithPlayers.className = "cpu-btn";
playWithPlayers.innerText = "Jogar com outros Players ";
playWithPlayers.onclick = function () {
  return cpuOverlay.remove();
};
cpuOverlay.append(playWithCpuBtn, playWithPlayers);
var app = document.querySelector("#app");
var movesContainer = document.createElement("div");
movesContainer.className = "moves container closed";
var movesActionBtn = document.createElement("button");
movesActionBtn.innerText = "Abrir Movimentos";
movesActionBtn.onclick = function () {
  return movesContainer.classList.toggle("closed");
};
movesContainer.appendChild(movesActionBtn);
app.append(eatenContainer, movesContainer, cpuOverlay);
console.log(_ChessBoard.default.piecesPositions);
},{"./components/ChessBoard":"src/components/ChessBoard.js","./components/ChessLayout":"src/components/ChessLayout.js","./components/ChessPieces":"src/components/ChessPieces.js","./stores/Timer":"src/stores/Timer.js","./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40893" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map