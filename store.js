
/**
 * Expose `Store`.
 */

module.exports = Store;

function Store(options) {
  
}

Store.prototype.add = function(emitter, args) {
  console.log('%s emitting %s: %s args', emitter, args.shift(), args.length, args);
  return this;
};
