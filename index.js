/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter;
var Store = require('./lib/store');

/**
 * Expose `EmitLogger`. 
 */

module.exports = EmitLogger;

/**
 * Expose `Store`.
 */

EmitLogger.Store = Store;

/**
 * @params {Store} store
 */

function EmitLogger(store) {
  this._emitters = [];
  this._store = store || new Store();
}

/**
 * Inherits from `EventEmitter`
 */

EmitLogger.prototype.__proto__ = Emitter.prototype;

/**
 * @param {EventEmitter} emitter
 */

EmitLogger.prototype.add = function(emitter) {
  if (!(emitter instanceof Emitter)) return this;
  
  var self = this;
  var emit = emitter.emit;

  emitter.emit = function() {
    var args = [].slice.call(arguments);
    self._store.add(emitter, args);
    return emit.apply(emitter, arguments);
  };

  this.once('remove', function(removedEmitter) {
    if (emitter !== removedEmitter) return;
    removedEmitter.emit = emit;
  });

  this._emitters.push(emitter);
  this.emit('add', emitter);
  
  return this;
};

/**
 * @param {EventEmitter} emitter
 */

EmitLogger.prototype.remove = function(emitter) {
  var previous = this._emitters.length;
  
  this._emitters = this._emitters.filter(function(e) {
    return e !== emitter;
  });
  
  if (previous !== this._emitters.length) {
    this.emit('remove', emitter);
  }
  
  return this;
};
