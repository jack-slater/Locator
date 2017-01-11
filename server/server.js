const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db = 'mongodb://admin:12345@ds161028.mlab.com:61028/test_db';
const Animals = require('../models/animals');

mongoose.connect(db, (err) => {
  if (!err) console.log('connected to database');
  else console.log('error connectng to database');
});

function getAnimals (param, callback) {
  Animals.find(param, function (err, doc) {
    if (err) {
      return callback(err);
    }
    callback(null, doc);
  });
}

app.get('/animals', (req, res) => {
  const param = req.params;
  getAnimals(param, function (err, data) {
    if (err) {
      return res.status(404).json({reason: 'Not Found'});
    }
    res.status(200).json({animals: data});
  });
});

app.listen(3000, function () {
  console.log(`listening on port 3000`);
});
