
var Emitter = require('events').EventEmitter;
var EmitLogger = require('../');
var logger = new EmitLogger();

var emitter1 = new Emitter();
var emitter2 = new Emitter();

logger.add(emitter1, { name: 'emitter1' });
logger.add(emitter2, { name: 'emitter2' });

emitter1.on('foo', function() {
  console.log('foo!');
});

emitter1.emit('foo', 'hello', 'world');

setInterval(function() {
  emitter2.emit('random', Math.random());
}, 500);
