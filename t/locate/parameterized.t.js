#!/usr/bin/env node

require('proof')(2, function (deepEqual) {
    var locate = require('../..')([
        { route: '/post/*:name/*:id', script: 'post/$name/$id/index.js' },
        { route: '/user/*:name', script: 'user/$name/index.js' }
    ])

    deepEqual(locate('/user/alan'), [
        {
            route:
            {
                route: '/user/*:name',
                script: 'user/$name/index.js'
            },
            params:
            {
                name: 'alan'
            }
        }
    ], 'matched one parameter')
    deepEqual(locate('/post/alan/1'), [
        {
            route:
            {
                route: '/post/*:name/*:id',
                script: 'post/$name/$id/index.js'
            },
            params: {
                name: 'alan',
                id: 1
            }
        }
    ], 'matched two parameters')
})
