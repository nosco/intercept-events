var util = require('util');
var EventEmitter = require('events').EventEmitter;


EventEmitter.prototype.emit2 = EventEmitter.prototype.emit;

EventEmitter.prototype.emit = function(type) {
  this.allIntercepters = this.allIntercepters || [];
  if(this.allIntercepters.length > 0) {
    for(var i=0 ; i < this.allIntercepters.length ; i++) {
      if(typeof this.allIntercepters[i] === 'function') {
        this.allIntercepters[i].apply(this, arguments);
      }
    }
  }
  this.emit2.apply(this, arguments);
}

EventEmitter.prototype.addIntercepter = function(listener) {
  this.allIntercepters = this.allIntercepters || [];
  this.allIntercepters.push(listener);
};

EventEmitter.prototype.removeIntercepter = function(listener) {
  this.allIntercepters = this.allIntercepters || [];
  if(this.allIntercepters.length > 0) {
    for(var i=(this.allIntercepters.length-1) ; i >= 0 ; i--) {
      if(this.allIntercepters[i] === listener) {
        this.allIntercepters.splice(i, 1);
        break;
      }
    }
  }
};
module.exports = EventEmitter;
