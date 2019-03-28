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
const port = 7000;
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/tcgLibraryClient')));

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

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!')
});
app.get('/', function catchRoute(req, res) {
  console.log('you came home');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/games', function catchRoute(req, res) {
  console.log('you got games');
  Game.find({}).then(games => {
    res.json(games);
    console.log('found');
  })
});

app.get('/body', function catchRoute(req, res, next) {
  console.log('you got games');
  next(new Error('sucks'));
});

app.post('/add-game', function catchRoute(req, res) {
  console.log('you got games');
  const game = new Game(
    {
      title: 'Halo',
      developer: 'Microsoft',
      details: 'First Person Shooter Game',
      comments: ['First Person', 'Shooter'],
      own: false,
      os: 'XBox',
      meta: {
        votes: 1
      }
    }
  );
  game.save().then((g, err) => {
    console.log(g, err);
    if (err) {
      res.error();
    }
    res.json(g);
  }, (errors) => {
    console.log('errors', errors);
    res.error();
  });
});
