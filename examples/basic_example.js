var express = require('express');
var Crumb = require('express-crumb');
var http = require('http');
var app = express();

var crumb = new Crumb() // Create new instance of express-crumb

app.use(crumb.generateCrumbs()) // Generate the crumbs using the default option settings

app.get("/", function(req, res, next) {
  res.send(res.locals.crumbs)
});

app.get("/test", function(req, res, next) {
  res.send(res.locals.crumbs)
});

app.get("/test/foo/bar", function(req, res, next){
  res.send(res.locals.crumbs)
})

crumb.getRoutes(app) // Gather the registered routes

var server = http.createServer(app)
server.listen(3000)

/** 
 * This will generate the following breadcrumbs (v1.1.0)
 *
 * Route: /
 * Crumbs: Home
 *
 * Route: /test
 * Crumbs: Home - Test
 *
 * Route: /test/foo/bar
 * Crumbs: Home - Test - Bar
 */

