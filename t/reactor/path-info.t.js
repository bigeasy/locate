#!/usr/bin/env node

require('proof')(4, function (ok, deepEqual) {
  var reactor = require('../..').createReactor();
  reactor.get('/first', function (params) {
    deepEqual(params, {}, "no path info");
  });
  reactor.get('/first/**:pathInfo', function (params) {
    deepEqual(params, { pathInfo: "path/info" }, "path info");
  });
  ok(reactor.react('GET', '/first', {}), 'matched no path info');
  ok(reactor.react('GET', '/first/path/info', {}), 'matched with path info');
});
