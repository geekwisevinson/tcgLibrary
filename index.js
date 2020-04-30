"use strict";
/*global __dirname*/


// SETUP

const environmentObject = require('./environment-consts.ts');

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const port = 7000;
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/tcgLibraryClient')));
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json());

const gameSchema = new mongoose.Schema({
  title: {type: String, unique: true, required: true},
  developer: String,
  details: String,
  comments: [String],
  date: {type: Date, default: Date.now},
  own: Boolean,
  os: String,
  meta: {
    votes: Number,
  }
});

gameSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Game').find({title: this.title}, cb);
};

const Game = mongoose.model('Game', gameSchema);


mongoose.connect(environmentObject.MLABURI, {useNewUrlParser: true}).then(
  (e) => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log('update',);
  },
  err => { /** handle initial connection error */
  }
);

http.listen(port, function () {
  console.log('listening on', port);
});

let requestID = 0;
const myLogger = function (req, res, next) {
  requestID++;
  console.log('******************', requestID);
  console.log( req.url);
  next()
};

app.use(myLogger);












// routes
app.get('/', function catchRoute(req, res) {
  console.log('you came home');
  res.sendFile(path.join(__dirname, 'index.html'));
});



// api
app.get('/forms-layout', function catchRoute(req, res, next) {
  Game.find({}).then(games => {
    res.locals.result = games;
    next();
  })
});

app.get('/games', function catchRoute(req, res, next) {
  Game.find({}).then(games => {
    res.locals.result = games;
    console.log('games', games);
    next();
  })
});

app.get('/error', function catchRoute(req, res, next) {
  console.log('you got games');
  next(new Error('sucks'));
});

app.post('/add-game', function catchRoute(req, res, next) {
  console.log('you got games', req.body);
  const game = new Game(
  req.body
  );
  game.save(function(err, saved) {
    if (err) {
      console.log('********');
      console.dir(err);
      console.log('********');
      console.log('next', next);
      next(err);
    }else {
      res.locals.result = saved;
      next();
    }

  });
});
app.post('/game-remove', function catchRoute(req, res, next) {
  console.log('you got games', req.body);
  Game.deleteOne(req.body, function (err, result) {

    if (err) {
      console.log('********');
      console.dir(err);
      console.log('********');
      console.log('next', next);
      next(err);
    }else {
      console.log('successfully deleted', req.body);
      res.locals.result = result;
      next();
    }

  });
});






// handlers


// success
app.use(function resResults (req, res, next) {
  console.log('results', res.locals)
  if(!res.locals.result) {
    next()
  }
  console.log(res.locals.result);
  console.log( req.url);
  console.log('******************', requestID);
  res.json(  res.locals.result);
});

// not found
app.get('*', function(req, res, next) {
  console.log(req.url, 'not found');
  let err = new Error('Page Not Found');
  err.statusCode = 404;
  next(err);
});
// error
app.use(function(err, req, res, next) {
  console.log('----------');
  console.error(err.message); // Log error message in our server's console
  console.log('----------', requestID);
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
