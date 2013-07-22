! function (definition) {
    if (typeof define == 'function') define(definition)
    else if (typeof module == 'object' && module.exports) module.exports = definition()
} (function () {
    var __slice = [].slice

    var REGEX = new RegExp('(\\' + '/ . * + ? | ( ) [ ] { } \\'.split(' ').join('|\\') + ')', 'g')

    return function (routes) {
        var patterns = routes.map(function (route) {
            var parts = route.route.split(/\//)
            var params = []
            var regex = []
            var $

            parts.forEach(function (part) {
                if ($ = /^(\*\*?)?:(\w[\w\d]+)$/.exec(part)) {
                    params.push($[2])
                    if ($[1] == '**') {
                        regex.push('(.+)')
                    } else {
                        regex.push('([^/]+)')
                    }
                } else {
                    regex.push(part.replace(REGEX, '\\$1'))
                }
            })

            
            return {
                regex: new RegExp('^' + regex.join('\\/') + '$'),
                params: params,
                route: route
            }
        })

        return function (path) {
            var methods = []
            var paths = []
            var found = []
            var params, copy, $

            patterns.forEach(function (pattern, index) {
                if ($ = pattern.regex.exec(path)) {
                    params = {}
                    pattern.params.forEach(function (param, index) {
                        params[param] = $[index + 1]
                    })
                    found.push({
                        params: params,
                        route: pattern.route
                    })
                }
            })

            return found
        }
    }
})
