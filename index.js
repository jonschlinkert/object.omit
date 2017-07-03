/*!
 * object.omit <https://github.com/jonschlinkert/object.omit>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('is-extendable');

module.exports = function omit(obj, keys) {
  if (!isObject(obj)) return {};

  keys = [].concat.apply([], [].slice.call(arguments, 1));
  var last = keys[keys.length - 1];
  var res = {}, fn;

  if (typeof last === 'function') {
    fn = keys.pop();
  }

  var isFunction = typeof fn === 'function';
  if (!keys.length && !isFunction) {
    return obj;
  }

  Object.keys(obj).forEach(function(key) {
    if (keys.indexOf(key) === -1) {

      if (!isFunction) {
        res[key] = obj[key];
      } else if (fn(obj[key], key, obj)) {
        res[key] = obj[key];
      }
    }
  });
  return res;
};
