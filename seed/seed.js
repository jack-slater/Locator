const animals = require('./data/animals');
const parks = require('./data/parks');
const sightings = require('./data/sightings');
const models = require('../models/models');

var mongoose = require('mongoose');
var async = require('async');
var log4js = require('log4js');
var logger = log4js.getLogger();

mongoose.connect('mongodb://localhost/test-park-project', function (err) {
  if (!err) {
    logger.info(`connected to database`);
    mongoose.connection.db.dropDatabase();
    async.waterfall([
      addParks,
      addAnimals,
      addSightings
    ], function (err) {
      if (err) {
        logger.error('ERROR SEEDING :O');
        console.log(JSON.stringify(err));
        process.exit();
      }
      logger.info('DONE SEEDING!!');
      process.exit();
    });
  } else {
    logger.error('DB ERROR');
    console.log(JSON.stringify(err));
    process.exit();
  }
});

function addParks (done) {
  async.eachSeries(parks, function (park, callback) {
    var parkDoc = new models.Parks(park);
    parkDoc.save(function (err) {
      if (err) {
        return callback(err);
      }
      return callback();
    });
  }, function (err) {
    if (err) {
      return done(err);
    }
    return done(null);
  });
}

function addAnimals (done) {
  async.eachSeries(animals, function (animal, callback) {
    var animalDoc = new models.Animals(animal);
    animalDoc.save(function (err) {
      if (err) {
        return callback(err);
      }
      return callback();
    });
  }, function (err) {
    if (err) {
      return done(err);
    }
    return done(null);
  });
}

function addSightings (done) {
  async.eachSeries(sightings, function (sighting, callback) {
    models.Parks.find({name: sighting.park_name}, function (err, doc) {
      if (err) {
        console.log(err);
      }
      sighting.park_id = doc._id;
    });

    models.Animals.find({common_name: sighting.animal_name}, function (err, doc) {
      if (err) {
        console.log(err);
      }
      sighting.animal_id = doc._id;
    });
    var sightingDoc = new models.Sightings(sighting);
    sightingDoc.save(function (err) {
      if (err) {
        return callback(err);
      }
      return callback();
    });
  }, function (err) {
    if (err) {
      return done(err);
    }
    return done(null);
  });
}
