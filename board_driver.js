var Device = require('zetta').Device;
var util = require('util');

var Board = module.exports = function(board) {
  Device.call(this);
  this._board = board;
};
util.inherits(Board, Device);

Board.prototype.init = function(config) {
  config
    .type('board')
    .state('stopped')
    .when('stopped', { allow: ['start'] })
    .when('started', { allow: ['stop'] })
    .map('start', this.start)
    .map('stop', this.stop);
};

Board.prototype.start = function(cb) {
  this._board.emit('start');
  this.state = 'started';
  cb();
};

Board.prototype.stop = function(cb) {
  this._board.emit('stop');
  this.state = 'stopped';
  cb();
};
