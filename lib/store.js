
/**
 * Module dependencies.
 */

var inspect = require('util').inspect;

/**
 * Expose `Store`.
 */

module.exports = Store;

/**
 * @param {Object} options
 */

function Store(options) {
  this.options = options || {};
}

/**
 * @param {EventEmitter} emitter
 * @param {Array} args
 */

Store.prototype.add = function(emitter, args) {
  console.log('\u001b[90m [emit-logger] %s \u001b[36m%s \u001b[90memitting\u001b[32m %s\u001b[0m:',
    +new Date(), emitter, args.shift(), inspect(args, { colors: true }));
  return this;
};
