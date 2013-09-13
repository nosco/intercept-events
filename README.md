# intercept-events

Intercept all events from events.EventEmitter.

With this module you can add and remove listeners, that will fire on all events (emits). 

The only difference between a normal listeners and these listeners is, that the event type will be the first argument:

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


This will output this:

	From intercept listener 1:
	{ '0': 'my test', '1': { the: 'data' } }
	From intercept listener 2:
	{ '0': 'my test', '1': { the: 'data' } }
	From normal listener:
	{ '0': { the: 'data' } }
	From intercept listener 1:
	{ '0': 'my test', '1': { the: 'data' } }
	From normal listener:
	{ '0': { the: 'data' } }
	From intercept listener 1:
	{ '0': 'exit', '1': 0 }



### This is an early BETA version

As soon as the module has shown it's worth and stability on a live system, it will be marked as version >= 1.0.0.

Until then: Feel free to play around with it, learn from it.

### To install

	npm install intercept-events


