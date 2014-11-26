var Scout = require('zetta').Scout;
var util = require('util');
var Board = require('game-of-life').Board;

var BoardDriver = require('./board_driver');
var CellDriver = require('./cell_driver');

var GameScout = module.exports = function(boardSize, seed){
  Scout.call(this);
  this._size = boardSize;
  this._seed = seed;
};
util.inherits(GameScout, Scout);

GameScout.prototype.init = function(next) {
  var self = this;
  var board = new Board(this._size);
  board.seed(this._seed);
  this.discover(BoardDriver, board);

  board.cells.forEach(function(cell) {
    self.discover(CellDriver, cell);
  });

  next();
};
