/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter;

/**
 * Expose `EmitLogger`. 
 */

module.exports = EmitLogger;

/**
 * @params {Store} store
 */

function EmitLogger(store) {
  this.store = store;
  this._emitters = [];
}

/**
 * Inherits from `EventEmitter`
 */

EmitLogger.__proto__ = Emitter.prototype;

/**
 * @param {EventEmitter} emitter
 */

EmitLogger.add = function(emitter) {
  
  if (!emitter.emit) return this;
  
  var emit = emitter.emit;
  
  emitter.emit = function() {
    var args = [].slice.call(arguments);
    store.add(emitter, args);
    return emit.apply(emitter, args);
  };
  
  this._emitters.push(emitter);
  this.emit('add', emitter);
  
  return this;
};

/**
 * @param {EventEmitter} emitter
 */

EmitLogger.remove = function(emitter) {
  var previous = this._emitters.length;
  
  this._emitters.filter(function(e) {
    return e == emitter;
  });
  
  if (previous !== this._emitters.length) {
    this.emit('remove', emitter);
  }
  
  return this;
};