'use strict';

var
  express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  multer = require('multer'),
  timeout = require('connect-timeout')
  ;

var app = express();

//region CORS
app.all('*', function (request, response, next) {
  if (!request.get('Origin')) return next();
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  response.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == request.method) return response.status(200).end();
  next();
});
//endregion

//region Timeout
app.use(timeout(10000000));
app.use(haltOnTimedout);
function haltOnTimedout(request, response, next) {
  if (!request.timedout) next();
}
//endregion

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

//region Settings
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(express.static(path.join(__dirname, 'public')));
//endregion

//region routes
app.use('/', require('./routes/mail-sender'));
//endregion

//region Error
app.use(function (request, response, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use(function (error, request, response, next) {
  if (error.status === 400) {
    return response.status(400).end();
  }
  next(error);
});

app.use(function (error, request, response, next) {
  response.format({
    json: function () {
      response
        .status(error.status || 500)
        .send({error: error.message})
        .end();
    },
    html: function () {
      response.status(error.status || 500);
      response.render('error', {
        message: error.message,
        error: error
      });
    }
  });

});
//endregion

module.exports = app;
