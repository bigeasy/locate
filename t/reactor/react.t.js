#!/usr/bin/env node

require('proof')(1, function (equal) {
  var reactor = require('../..').createReactor();

  reactor.on('get', '/index.html', function (extra) {
    equal(extra, 1, 'extra');
  });

  reactor.react('GET', '/index.html', 1);
});
