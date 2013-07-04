
var assert = require('assert');
var Emitter = require('events').EventEmitter;

describe('emit-logger', function() {
  var EmitLogger = require('..');

  it('should expose EmitLogger constructor', function() {
    assert('function' === typeof EmitLogger);
    assert('EmitLogger' === EmitLogger.name);
  });

  describe('EmitLogger', function() {
    var logger = new EmitLogger();
    
    var emitter1 = new Emitter();
    var emitter2 = new Emitter();
    
    it('#add()', function() {
      logger.add(emitter1);
      logger.add(emitter2);
      assert(2 == logger._emitters.length);
    });
    
    it('#remove()', function() {
      logger.remove(emitter2);
      
      assert(1 == logger._emitters.length);
    });
    
    it('.Store#add()', function(done) {
      logger._store = {
        add: function(emitter, args) {
          assert(emitter === emitter1);
          assert('foo' === args[0]);
          assert('hello' === args[1]);
          assert('world' === args[2]);
          done();
        }
      };
      emitter1.emit('foo', 'hello', 'world');
    });
  });
});
