#!/usr/bin/env node

require('proof')(5, function (ok, equal) {
  var reactor = require('../..').createReactor();
  reactor.get('/user/:name', function (object) {
    equal(object.params.name, 'alan');
  });
  reactor.get('/post/:name/:id', function (object) {
    equal(object.params.name, 'alan');
    equal(object.params.id, '1');
  });
  ok(reactor.react('GET', '/user/alan', {}), 'matched one parameter');
  ok(reactor.react('GET', '/post/alan/1', {}), 'matched two parameters');
});
