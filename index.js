"use strict";
/*global __dirname*/


// SETUP

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

mongoose.connect(Mon, options).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
  err => { /** handle initial connection error */ }
);

http.listen(port, function () {
  console.log('listening on', port);
});


app.get('/', function catchRoute(req, res) {
  console.log('you came home');
  res.sendFile(path.join(__dirname, 'index.html'));
});
