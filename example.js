var util = require('util');
var EventEmitter = require('./index');

var MyClass = function() {
  EventEmitter.call(this);
};
util.inherits(MyClass, EventEmitter);

MyClass.prototype.test = function() {
  this.emit('my test', { the: 'data' });
};
var myClass = new MyClass();

myClass.on('my test', function() {
  console.log('From normal listener:');
  console.log(arguments);
});

var myListener1 = function() {
  console.log('From intercept listener 1:');
  console.log(arguments);
};

var myListener2 = function() {
  console.log('From intercept listener 2:');
  console.log(arguments);
};

myClass.addIntercepter(myListener1);
myClass.addIntercepter(myListener2);

myClass.test();

myClass.removeIntercepter(myListener2);

myClass.test();
