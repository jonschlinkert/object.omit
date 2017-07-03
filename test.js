/*!
 * object.omit <https://github.com/jonschlinkert/object.omit>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var should = require('should');
var omit = require('./');

describe('.omit()', function () {
  it('should omit the given key from the object.', function () {
    omit({a: 'a', b: 'b', c: 'c'}, 'a').should.eql({ b: 'b', c: 'c' });
  });

  it('should omit the given keys as array from the object.', function () {
    omit({a: 'a', b: 'b', c: 'c'}, ['a', 'c']).should.eql({ b: 'b' });
  });

  it('should omit the given keys as arrays from the object.', function () {
    omit({a: 'a', b: 'b', c: 'c'}, ['a'], ['b', 'c']).should.eql({});
  });

  it('should omit the given keys as parameters from the object.', function () {
    omit({a: 'a', b: 'b', c: 'c'}, 'a', 'c').should.eql({ b: 'b' });
  });


  it('should return the object if no keys are specified.', function () {
    omit({a: 'a', b: 'b', c: 'c'}).should.eql({a: 'a', b: 'b', c: 'c'});
  });

  it('should take a filter function as the last argument.', function () {
    var foo = omit({a: 'a', b: 'b', c: 'c'}, function (val, key) {
      return key === 'a';
    });
    var fn = function() {};
    var bar = omit({a: 'a', b: 'b', c: fn}, function (val, key) {
      return typeof val !== 'function';
    });
    foo.should.eql({a: 'a'});
    bar.should.eql({a: 'a', b: 'b'});
  });

  it('should copy properties to a new object.', function () {
    var foo = {a: 'a', b: 'b', c: 'c', d: 'd'};
    var bar = omit(foo, ['d'], function (val, key) {
      return key === 'a' || key === 'd';
    });
    foo.should.eql({a: 'a', b: 'b', c: 'c', d: 'd'});
    bar.should.eql({a: 'a'});
  });

  it('should return an empty object if the first arg is not an object.', function () {
    omit(null, {a: 'a', b: 'b', c: 'c'}).should.eql({});
  });

  it('should return an empty object if no object is specified.', function () {
    omit().should.eql({});
  });
});
