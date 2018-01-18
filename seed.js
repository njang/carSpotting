// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

//require ./models S1S5 TC
var db = require("./models");

var clientList =[];
//hard-coded model data S1S4 TC
clientList.push({
  name: 'Jason Bourne',
  address: String,
  phone: Number,
  lotSize: Number,
  turfType: String,
  lastMowed: Number
});

// populate each albums song list
// for each album in clientList set album.songs to be sampleSongs for that album S3S2 TC
clientList.forEach(function(album) {
  album.songs = sampleSongs;
});


db.Album.remove({}, function(err, albums){

  db.Album.create(clientList, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });
});
