#!/usr/bin/env node

require('proof')(2, function (ok, deepEqual) {
    var reactor = require('../..')([
        { route: '/first', script: 'first.js' },
        { route: '/first/**:pathInfo', script: 'first_.js' }
    ])
    deepEqual(reactor('/first'), [
        {
            route:
            {
                route: '/first',
                script: 'first.js'
            },
            params: {}
        }
    ], 'matched no path info')
    deepEqual(reactor('/first/path/info'), [
        {
            route:
            {
                route: '/first/**:pathInfo',
                script: 'first_.js'
            },
            params:
            {
                pathInfo: 'path/info'
            }
        }
    ], 'matched width path info')
})
