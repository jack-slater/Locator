const request = require('superagent');
const async = require('async');
const animalsData = require('../seed/data/animals');
const fs = require('fs');

const getWikiData = (callback) => {
  async.waterfall([
    firstGetImg,
    secondGetImg,
    getText
  ], function (err, res) {
    if (err) {
      return callback(err);
    }
    return callback(null, res);
  });
};

const firstGetImg = (done) => {
  async.mapSeries(animalsData, (animal, mapCallback) => {
    const name = animal.wiki_name;
    request
      .get(`http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=100&titles=${name}`)
      .end((err, res) => {
        if (err) mapCallback(err);
        for (var key in res.body.query.pages) {
          animal.photo = res.body.query.pages[key].pageimage;
          // console.log(animal.photo, animal.common_name);
          mapCallback(null, animal);
        }
      });
  }, (err) => {
    if (err) return done(err);
    return done(null, animalsData);
  });
};

const secondGetImg = (newAnimalsData, done) => {
  async.mapSeries(newAnimalsData, (animal, mapCallback) => {
    const imgName = `File:${animal.photo}`.replace('&', '%26');
    request
      .get(`http://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=${imgName}`)
      .end((err, res) => {
        if (err) mapCallback(err);
        for (var key in res.body.query.pages) {
          animal.photo = res.body.query.pages[key].imageinfo[0].url;
          // console.log(animal.photo, animal.common_name);
          mapCallback(null, animal);
        }
      });
  }, (err) => {
    if (err) return done(err);
    return done(null, newAnimalsData);
  });
};

const log = (err, res) => {
  if (err) return console.log(err);
  fs.writeFile('data.json', JSON.stringify(res), (err) => {
    if (err) console.log(err);
    console.log('file saved');
  })
};

const getText = (newAnimalsData, done) => {
  async.mapSeries(newAnimalsData, (animal, mapCallback) => {
    const name = animal.wiki_name;
    request
      .get(`http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&explaintext=&titles=${name}`)
      .end((err, res) => {
        if (err) mapCallback(err);
        for (var key in res.body.query.pages) {
          animal.description = res.body.query.pages[key].extract;
          // console.log(animal.description);
          mapCallback(null, animal);
        }
      });
    }, (err) => {
      if (err) return done(err);
      return done(null, newAnimalsData);
  });
};

console.log(getWikiData(log));

module.exports = {
  firstGetImg,
  secondGetImg,
  getText
};
