var fs = require("fs"), path = require("path");

function routes (base, suffix) {
  var routes = [], dotted = '.' + suffix;
  function children (base, parts) {
    var dir = path.join.apply(path, [ base ].concat(parts)), files = [];
    fs.readdirSync(dir).forEach(function (entry) {
      var file = path.join(dir, entry), stat = fs.statSync(file);
      if (stat.isDirectory()) {
        children(base, parts.concat(entry));
      } else {
        files.push(entry);
      }
    });
    files.forEach(function (entry) {
      var file = path.join(dir, entry), suffixed;
      if (entry.lastIndexOf(dotted) == entry.length - dotted.length) {
        if (entry[0] != '_') {
          var $ = /^(.*?)(_?)\.(.*)$/.exec(entry),
              name = $[1], pathInfo = !! $[2], extension = $[3],
              route = parts.slice(0);
          if (name != "index") route.push(name);
          // Note that we do not use the file systems path separator when
          // resolving stencils.
          routes.push({
            route: "/" + route.join("/"),
            script: parts.concat(entry).join("/"),
            path: route.slice(),
            file: entry,
            name: name,
            extension: extension.slice(0, - dotted.length)
          });
          if (pathInfo) {
            routes.push({
              route: "/" + route.join("/") + "/**:pathInfo",
              script: parts.concat(entry).join("/"),
              path: route.slice(),
              file: entry,
              name: name,
              extension: extension.slice(0, - dotted.length)
            });
          }
        }
      }
    });
  }
  children(base, []);
  return routes;
}

if (require.main === module) console.log(routes('t/register/fixtures', 'js'));
else module.exports = routes;
