# Reactor [![Build Status](https://secure.travis-ci.org/bigeasy/reactor.png?branch=master)](http://travis-ci.org/bigeasy/reactor) [![Coverage Status](https://coveralls.io/repos/bigeasy/reactor/badge.png?branch=master)](https://coveralls.io/r/bigeasy/reactor) [![NPM version](https://badge.fury.io/js/reactor.png)](http://badge.fury.io/js/reactor)

Zero dependency routing for the browser and Node.js.

## Route Callbacks

When you declare a route, you provide a callback function that the reactor will
invoke if the route matches. Route callbacks always receive parameters extracted
from the path as their first argument. 

## Route Patterns

Simple parameterized routes provide a parameter object as a first argument.

```javascript
reactor.get("/photos/:user", function (params, req, res) {
  console.log(JSON.stringify(params));
});
reactor.react("GET", "/photos/alan", req, res);
```

The above script will print `{ user: "alan" }` on the console.

Static routes still provide a parameter object for consistency, but it is always
empty.

```javascript
reactor.get("/hello", function (params, req, res) {
  console.log(JSON.stringify(params));
});
reactor.react("GET", "/hello", req, res);
```

The above script will print `{}` to the console.

Parameterized routes can match one or more parts in a path. To match multiple
parts use a double star before the parameter name.

```javascript
reactor.get("/files/**:pathInfo", function (params, req, res) {
  console.log(JSON.stringify(params));
});
reactor.react("GET", "/files/cats/lol.jpg", req, res);
```

The above script will print `{ pathInfo: "cats/lol.jpg" }` to the console.

## Change Log

Changes for each release.

### Version 0.0.5

Thu Mar 21 23:41:09 UTC 2013

 * Parameterize the `find.js` file suffix. #15.
 * Rename `routify.js` to `find.js`.
 * Move `routify.js` over from the Register project. #14.
 * Add a contribution guide and a license.
 * POSIX shell compatible test helpers.
 * Upgrade Proof to 0.0.27.

### Version 0.0.4

Sun Dec  9 17:56:25 UTC 2012

 * Pass parameters to callback as first argument. #12.
 * Match sub-paths. #11.
 * Implement parameterized routes. #10.
 * Add `.js` suffix to test programs. #9.
 * Clean up AMD/CommonJS invocation switch. #8.

### Version 0.0.3

Mon Aug 13 01:55:31 UTC 2012

 * Remove echo of method and url. #7.
 * Add `homepage` to `package.json`. #4.
 * Convert `t/sizes.t` to work on OS X. #6.
 * Case-insensitive request method match. #5.

### Version 0.0.2

Thu Jul 19 08:14:30 UTC 2012

 * Build on Travis CI. #3.
 * Create basic router. #1.
