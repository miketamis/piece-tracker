var UNKNOWN = 0;
var DONE = 1;
var RESERVED = 2;

var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
inherits(PieceTracker, EventEmitter)

function PieceTracker(storage) {
  var self = this
  self.pieces = []
  for(var i = 0; i < storage.pieces.length; i++) {
   self.pieces[i] = UNKNOWN; 
  }
  
  storage.on('piece', function(piece) { 
    self.set_piece_done(piece.index);
  });
  
}

PieceTracker.prototype.set_piece_done = function(index) {
  var self = this;
  self.pieces[index] = DONE; 
  self.emit('piece',index, self.pieces[index]);

}

PieceTracker.prototype.reserve = function(index) {
  var self = this;
  if(self.pieces[index] != UNKNOWN) {
    return false; 
  }
  self.pieces[index] = RESERVED;
  self.emit('piece',index, self.pieces[index]);
  return true;
}

module.exports = PieceTracker;