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
.use('/img/', express.static(__dirname + '/img')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
// .use(favicon(__dirname + '/public/favicon.ico')) // Active la favicon indiquée
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
// .use(function(req, res, next){
//   res.setHeader('Content-Type', 'text/plain');
//   // res.send(404, 'Page introuvable !');
// });


// var server = http.createServer(function(req, res) {
// 	var page = url.parse(req.url).pathname;
//   console.log(page);

//   res.writeHead(200, {"Content-Type": "text/html"});

//   if (page == '/') {
//     res.write('/');
//   }
//   else if (page == '/eurelis') {
//     res.write('eurelis');
//   }
//   else if (page == '/kineticJS') {
//     res.write('/kineticJS');
//   }
  
//   res.end();
// });
app.listen(8080);