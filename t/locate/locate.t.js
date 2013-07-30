#!/usr/bin/env node

require('proof')(2, function (equal, deepEqual) {
    var locate = require('../..')([
        { route: '/one', script: 'one/index.js' },
        { route: '/one/two', script: 'one/two.js' }
    ])
    deepEqual(locate('/one'), [
        {
            route:
            {
                route: '/one',
                script: 'one/index.js'
            },
            params: {}
        }
    ], 'matched path with one part')
    deepEqual(locate('/one/two'), [
        {
            route:
            {
                route: '/one/two',
                script: 'one/two.js'
            },
            params: {}
        }
    ], 'matched path with two parts')
})
