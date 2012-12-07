#!/usr/bin/env node

require('proof')(5, function (ok, equal) {
  var reactor = require('../..').createReactor();
  reactor.get('/user/:name', function (params) {
    equal(params.name, 'alan', 'one parameter first parameter');
  });
  reactor.get('/post/:name/:id', function (params) {
    equal(params.name, 'alan', 'two parameters first parameter');
    equal(params.id, '1', 'two parameters second parameter');
  });
  ok(reactor.react('GET', '/user/alan'), 'matched one parameter');
  ok(reactor.react('GET', '/post/alan/1'), 'matched two parameters');
});
