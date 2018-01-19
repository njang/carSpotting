// require mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/lawnTracker");

var Client = require('./client');

module.exports.Client = Client;
