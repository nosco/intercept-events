var util = require('util');
var EventEmitter = require('events').EventEmitter;

var allListeners = [];

EventEmitter.prototype.emit2 = EventEmitter.prototype.emit;

EventEmitter.prototype.emit = function(type) {
  if(allListeners.length > 0) {
    for(var i=0 ; i < allListeners.length ; i++) {
      if(typeof allListeners[i] === 'function') {
        allListeners[i].apply(this, arguments);
      }
    }
  }
  this.emit2.apply(this, arguments);
}

exports.addListener = function(listener) {
  allListeners.push(listener);
};

exports.removeListener = function(listener) {
  if(allListeners.length > 0) {
    for(var i=(allListeners.length-1) ; i >= 0 ; i--) {
      if(allListeners[i] === listener) {
        allListeners.splice(i, 1);
        break;
      }
    }
  }
};

