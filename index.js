! function (definition) {
    if (typeof define == 'function') define(definition)
    else if (typeof module == 'object' && module.exports) module.exports = definition()
} (function () {
    var __slice = [].slice

    var REGEX = new RegExp('(\\' + '/ . * + ? | ( ) [ ] { } \\'.split(' ').join('|\\') + ')', 'g')

    return function (paths) {
        var patterns = paths.map(function (path) {
            var parts = path.route.split(/\//)
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
                script: path.script
            }
        })

        return function (path) {
            var methods = []
            var paths = []
            var found = []
            var $

            patterns.forEach(function (pattern, index) {
                if ($ = pattern.regex.exec(path)) {
                    var params = {}
                    pattern.params.forEach(function (param, index) {
                        params[param] = $[index + 1]
                    })
                    found.push({ script: pattern.script, params: params })
                }
            })

            return found
        }
    }
})
