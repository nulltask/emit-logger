
/**
 * Module dependencies.
 */

var Writable = require('stream').Writable;

/**
 * Expose `Store`.
 */

module.exports = Store;

function Store(options) {
  Writable.call(this);
  this.objectMode = true;
}

Store.__proto__ = Writable.prototype;

Store.prototype.add = function(emitter, args) {
  console.log('%s emitting %s: %s args', emitter, args.shift(), args.length, args);
  return this;
};
