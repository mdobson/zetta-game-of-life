var Device = require('zetta').Device;
var util = require('util');

var Cell = module.exports = function(cell){
  Device.call(this);
  this._cell = cell;
};
util.inherits(Cell, Device);

Cell.prototype.init = function(config) {
  var self = this;
  config
    .type('cell')
    .state(this._cell.state)
    .when('dead', { allow: ['rez'] })
    .when('alive', { allow: ['kill'] })
    .map('rez', this.rez)
    .map('kill', this.kill);

  this._cell.on('dead', function() {
    if(self.available('kill')) {
      self.call('kill');
    }
  });

  this._cell.on('alive', function() {
    if(self.available('rez')) {
      self.call('rez');
    }
  });
};

Cell.prototype.rez = function(cb) {
  this.state = 'alive';
  cb();
};

Cell.prototype.kill = function(cb) {
  this.state = 'dead';
  cb();
};
