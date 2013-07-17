#!/usr/bin/env node

require('proof')(2, function (deepEqual) {
    var reactor = require('../..')([
        { route: '/post/*:name/*:id', script: 'post/$name/$id/index.js' },
        { route: '/user/*:name', script: 'user/$name/index.js' }
    ])
    deepEqual(reactor('/user/alan'), [
        { script: 'user/$name/index.js', params: { name: 'alan' } }
    ], 'matched one parameter')
    deepEqual(reactor('/post/alan/1'), [
        { script: 'post/$name/$id/index.js', params: { name: 'alan', id: 1 } }
    ], 'matched two parameters')
})
