const request = require('superagent');
const async = require('async');

const getWikiImages = (name, callback) => {
  async.waterfall([
    firstGet.bind(null, name),
    secondGet
  ], function (err, res) {
    if (err) {
      return callback(err);
    }
    return callback(null, res);
  });
};

const formatName = (name) => {
  return name.replace(' ', '_');
};

const firstGet = (name, callback) => {
  name = formatName(name);
  request
    .get(`http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=100&titles=${name}`)
    .end((err, res) => {
      if (err) callback(err);
      for (var key in res.body.query.pages) {
        const imgName = res.body.query.pages[key].pageimage;
        callback(null, imgName);
      }
    });
};

const secondGet = (imgName, callback) => {
  if (imgName.slice(0, 3) !== 'File') {
    imgName = `File:${imgName}`;
  }
  request
    .get(`http://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=${imgName}`)
    .end((err, res) => {
      if (err) callback(err);
      const imgUrl = res.body.query.pages['-1'].imageinfo[0].url;
      callback(null, imgUrl);
    });
};

const log = (err, res) => {
  if (err) return console.log(err);
  return console.log(res);
};

const getWikiText = (name, callback) => {
  name = formatName(name);
  request
    .get(`http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&explaintext=&titles=${name}`)
    .end((err, res) => {
      if (err) callback(err);
      for (var key in res.body.query.pages) {
        const textExtract = res.body.query.pages[key].extract;
        callback(null, textExtract);
      }
    });
};

getWikiText('magpie', log);
// getWikiImages('black-headed gull', log);
