#!/usr/bin/env node

require('proof')(2, function (equal, deepEqual) {
  var reactor = require('../..').createReactor();

  reactor.on('get', '/index.html', function (params, extra) {
    deepEqual(params, {}, 'params');
    equal(extra, 1, 'extra');
  });

  reactor.react('GET', '/index.html', 1);
});
