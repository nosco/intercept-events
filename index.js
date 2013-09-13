var util = require('util');
var EventEmitter = require('events').EventEmitter;

var interceptEvents = function() {
  EventEmitter.call(this);
  this.allIntercepters = [];
};
util.inherits(interceptEvents, EventEmitter);


interceptEvents.prototype.emit = function(type) {
  
  if(this.allIntercepters.length > 0) {
    for(var i=0 ; i < this.allIntercepters.length ; i++) {
      if(typeof this.allIntercepters[i] === 'function') {
        this.allIntercepters[i].apply(this, arguments);
      }
    }
  }
  EventEmitter.prototype.emit.apply(this, arguments);
}

interceptEvents.prototype.addIntercepter = function(listener) {
  this.allIntercepters = this.allIntercepters || [];
  this.allIntercepters.push(listener);
};

interceptEvents.prototype.removeIntercepter = function(listener) {
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
module.exports = interceptEvents;
