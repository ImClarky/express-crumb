var express = require('express');
var Crumb = require('express-crumb');
var http = require('http');
var app = express();

var crumb = new Crumb()

app.get("/", function(req, res, next) {
  res.send("home")
});

app.get("/test", function(req, res, next) {
  res.send("test")
});

app.get("/test/foo/bar", crumb.generateCrumbs({includeHome:false,includeNonRoutes:true, linkLastCrumb:true}), function(req, res, next){
  res.send(res.locals.crumbs)
})

crumb.getRoutes(app)

var server = http.createServer(app)
server.listen(3000)
