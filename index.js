! function (definition) {
  if (typeof module == "object" && module.exports) module.exports = definition();
  else if (typeof define == "function") define(definition);
  else this.createReactor = definition().createReactor;
} (function () {
// Only local if URL is local.

// Fallback to hash polling. Check frequently.

// On the client, we look at forms and links to determine method.

// Use live or delegate, need to be friendly with a selector langauge.
  var slice = [].slice;

  var REGEX = new RegExp('(\\' + '/ . * + ? | ( ) [ ] { } \\'.split(' ').join('|\\') + ')', 'g');

  function regular (text) { return text.replace(REGEX, '\\$1') }

  function parse (path) {
    if (typeof path != "string") return path;
    var parts = path.split(/\//), i, I, $, match = {}, regex = [];
    for (i = 0, I = parts.length; i < I; i++) {
      if ($ = /^(\*\*?)?:(\w[\w\d]+)$/.exec(parts[i])) {
        if (!match.params) match.params = [];
        match.params.push($[2]);
        if ($[1] == "**") {
          regex.push('(.+)');
        } else {
          regex.push('([^/]+)');
        }
      } else {
        regex.push(regular(parts[i]));
      }
    }
    match.regex = new RegExp('^' + regex.join('\\/') + '$');
    return match;
  }


  function Reactor () {
    this.on = on; this.get = get; this.post = post; this.react = react;

    var reactions = [];

    function reaction (methods, path, callback) {
      var match = parse(path);
      reactions.push(function (method, path) {
        var i, I, j, J, $, params = {};
        for (i = 0, I = methods.length; i < I; i++) {
          if ((method == method) && ($ = match.regex.exec(path))) {
            if (match.params) {
              for (j = 0, J = match.params.length; j < J; j++) {
                params[match.params[j]] = $[j + 1]; 
              }
            } else {
              params = $.slice(1);
            }
            callback.apply(null, [ params ].concat(slice.call(arguments, 2)));
            return true;
          }
        }
      });
    }

    function on () {
      var vargs = slice.call(arguments, 0), i, I,
          methods = [], paths = [], callback = vargs.pop();
      for (i = 0, I = vargs.length; i < I; i++) {
        if (vargs[i][0] == '/') {
          paths.push(vargs[i]);
        } else {
          methods.push(vargs[i].toLowerCase());
        }
      }
      for (i = 0, I = paths.length; i < I; i++) {
        reaction(methods, paths[i], callback);
      }
    }
   
    function get () { on.apply(this, [ 'get' ].concat(slice.call(arguments, 0))) }
    function post () { on.apply(this, [ 'post' ].concat(arguments)) }

    function react (method, url) {
      var i, I, match;
      for (i = 0, I = reactions.length; i < I; i++) {
        if (reactions[i].apply(null, arguments)) return true;
      }
      return false;
    }
  }

  return { createReactor: function () { return new Reactor } };
});
