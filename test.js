/*!
 * object.omit <https://github.com/jonschlinkert/object.omit>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var omit = require('./');

describe('.omit()', function() {
  it('should omit a key from the object', function() {
    assert.deepEqual(omit({a: 'a', b: 'b', c: 'c'}, 'a'), { b: 'b', c: 'c' });
    assert.deepEqual(omit({aaa: 'a', bbb: 'b', ccc: 'c'}, 'aaa'), { bbb: 'b', ccc: 'c' });
  });

  it('should omit an array of keys from the object', function() {
    assert.deepEqual(omit({a: 'a', b: 'b', c: 'c'}, ['a', 'c']), { b: 'b' });
  });

  it('should return the object if no keys are given', function() {
    assert.deepEqual(omit({a: 'a', b: 'b', c: 'c'}), {a: 'a', b: 'b', c: 'c'});
  });

  it('should return a new object when no keys are given', function() {
    var obj = {a: 'a', b: 'b', c: 'c'};
    assert(omit(obj) !== obj);
  });

  it('should take a filter function as the last argument', function() {
    var foo = omit({a: 'a', b: 'b', c: 'c'}, function(val, key) {
      return key === 'a';
    });
    var bar = omit({a: 'a', b: 'b', c: function() {}}, function(val, key) {
      return typeof val !== 'function';
    });
    assert.deepEqual(foo, {a: 'a'});
    assert.deepEqual(bar, {a: 'a', b: 'b'});
  });

  it('should copy properties to a new object', function() {
    var foo = {a: 'a', b: 'b', c: 'c', d: 'd'};
    var bar = omit(foo, ['d'], function(val, key) {
      return key === 'a' || key === 'd';
    });
    assert.deepEqual(foo, {a: 'a', b: 'b', c: 'c', d: 'd'});
    assert.deepEqual(bar, {a: 'a'});
  });

  it('should return an empty object if the first arg is not an object', function() {
    assert.deepEqual(omit(null, {a: 'a', b: 'b', c: 'c'}), {});
  });

  it('should return an empty object if no object is specified', function() {
    assert.deepEqual(omit(), {});
  });
});
