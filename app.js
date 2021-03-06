var express = require('express');
var http = require('http');
var WebSocketServer = require('ws').Server;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var receive = require('./routes/receive');

var app = express();

// global
logMessages = []
conf        = {
  "maxLines" : 50
}

var server = http.createServer(app);
var wss = new WebSocketServer({ 
  server: server,
  port: 3001
})

// ws
var connections = [];
 
wss.on('connection', function (ws) {
  connections.push(ws);
  ws.on('close', function () {
    connections = connections.filter(function (conn, i) {
        return (conn === ws) ? false : true;
    });
  });
  ws.on('message', function (message) {
    console.log('message:', message);
    broadcast(JSON.stringify(message));
  });
});

// Do broadcast.
broadcast = function(message) {
  connections.forEach(function (con, i) {
    con.send(message);
  });
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/receive', receive);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
