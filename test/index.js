
var assert = require('better-assert');
var Emitter = require('events').EventEmitter;

describe('emit-logger', function() {
  var EmitLogger = require('..');

  it('should expose EmitLogger constructor', function() {
    assert('function' === typeof EmitLogger);
    assert('EmitLogger' === EmitLogger.name);
  });

  describe('Store', function() {
    it('should expose Store constructor', function() {
      assert('function' === typeof EmitLogger.Store);
      assert('Store' === EmitLogger.Store.name);
    });

    it('#add()', function() {
      assert('function' === typeof EmitLogger.Store.prototype.add);
    });
  });

  describe('EmitLogger', function() {
    var logger = new EmitLogger();
    
    var emitter1 = new Emitter();
    var emitter2 = new Emitter();
    
    it('#add(emitter1)', function() {
      logger.once('add', function(emitter) {
        assert(emitter1 === emitter);
        assert(1 === logger._emitters.length);
      });
      logger.add(emitter1);
    });

    it('#add(emitter2)', function() {
      logger.once('add', function(emitter) {
        assert(emitter2 === emitter);
        assert(2 === logger._emitters.length);
      });
      logger.add(emitter2);
    });
    
    it('#remove(emitter2)', function() {
      logger.once('remove', function(emitter) {
        assert(emitter2 === emitter);
        assert(1 === logger._emitters.length);
        assert(emitter1 === logger._emitters[0]);
      });
      logger.remove(emitter2);
    });
    
    it('.Store#add()', function() {
      logger._store = {
        add: function(emitter, args) {
          assert(emitter === emitter1);
          assert('foo' === args[0]);
          assert('hello' === args[1]);
          assert('world' === args[2]);
        }
      };
      emitter2.emit('foo', 'hello', 'world');
      emitter1.emit('foo', 'hello', 'world');
    });
  });
});
