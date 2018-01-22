// require mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: String,
  location: {
    streetAddress: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  phone: Number,
  lawn: {
    lotSize: Number,
    turfType: String,
    lastMowed: Number
  }
});

// const Client = mongoose.model('Client', ClientSchema);
// module.exports = Client;
module.exports = mongoose.model('Client', ClientSchema);
