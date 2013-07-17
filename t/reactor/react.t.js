#!/usr/bin/env node

require('proof')(2, function (equal, deepEqual) {
    var reactor = require('../..')([
        { route: '/one', script: 'one/index.js' },
        { route: '/one/two', script: 'one/two.js' }
    ])
    deepEqual(reactor('/one'), [
        { script: 'one/index.js', params: {} }
    ], 'matched path with one part')
    deepEqual(reactor('/one/two'), [
        { script: 'one/two.js', params: {} }
    ], 'matched path with two parts')
})
