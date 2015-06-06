var http = require('http');
var url = require('url');
var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');

var app = express();

app.use(morgan('combined'))
.use('/css/', express.static(__dirname + '/css'))
.use('/js/', express.static(__dirname + '/js'))
.use('/font-awesome/', express.static(__dirname + '/font-awesome'))
.use('/node_modules/', express.static(__dirname + '/node_modules'))
.use('/img/', express.static(__dirname + '/img'))
// .use(favicon(__dirname + '/public/favicon.ico'))
.get('/', function(req, res) {
  res.render('index.ejs');
})
.get('/eurelis', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('/eurelis');
})
.get('/kineticJS', function(req, res) {
  res.render('kineticJS.ejs');
})

app.listen(8080);