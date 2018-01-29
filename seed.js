// This file allows us to seed our application with data
// Run `node seed.js` from the root of this project folder.

var db = require("./models");

const calcLastMowed = (durationInDays) => {
  let today = new Date();
  let lastMowed = new Date((today - (durationInDays * 24 * 60 * 60 * 1000)));
  result = `${lastMowed.getMonth()+1}/${lastMowed.getDate()}/${lastMowed.getFullYear()}`
  return result;
  // return Math.floor((today - (durationInDays * 24 * 60 * 60 * 1000)) / 1000);
};

var clientList =[];
clientList.push({
  name: "Samantha Duncan",
  phone: 9793825018,
  location: { 
    streetAddress: "2908 Bolero Ct, College Station, TX 77845", 
    coordinates: { lat: 30.580330, lng: -96.313033 } 
  },
  lawn: { lotSize: 0.25, turfType: "St. Augustine", lastMowed: calcLastMowed(5) }
});
clientList.push({
  name: "Jonathan Ransom",
  phone: 9795731839,
  location: { 
    streetAddress: "2905 Aztec Ct, College Station, TX 77845", 
    coordinates: { lat: 30.581416, lng: -96.312349 } 
  },
  lawn: { lotSize: 0.24, turfType: "St. Augustine", lastMowed: calcLastMowed(3) }
});
clientList.push({
  name: "Meghan Allen",
  phone: 9792733752,
  location: { 
    streetAddress: "710 Encinas Pl, College Station, TX 77845", 
    coordinates: { lat: 30.578982, lng: -96.310234 } 
  },
  lawn: { lotSize: 0.26, turfType: "Bermuda", lastMowed: calcLastMowed(15) }
});
clientList.push({
  name: "Ross Fairbanks",
  phone: 9792839103,
  location: { 
    streetAddress: "3005 Durango St, College Station, TX 77845", 
    coordinates: { lat: 30.578355, lng: -96.312721 } 
  },
  lawn: { lotSize: 0.30, turfType: "St. Augustine", lastMowed: calcLastMowed(12) }
});
clientList.push({
  name: "Christopher Chen",
  phone: 7132835909,
  location: { 
    streetAddress: "1008 Oakhaven Cir, College Station, TX 77840", 
    coordinates: { lat: 30.635970, lng: -96.312009 } 
  },
  lawn: { lotSize: 0.28, turfType: "St. Augustine", lastMowed: calcLastMowed(15) }
});
clientList.push({
  name: "Dustin Avery",
  phone: 9792038738,
  location: { 
    streetAddress: "1110 Woodhaven Cir, College Station, TX 77840", 
    coordinates: { lat: 30.634736, lng: -96.311362 } 
  },
  lawn: { lotSize: 0.45, turfType: "St. Augustine", lastMowed: calcLastMowed(14) }
});
clientList.push({
  name: "Fabian Ros",
  phone: 7132849083,
  location: { 
    streetAddress: "1406 Post Oak Cir, College Station, TX 77840", 
    coordinates: { lat: 30.635586, lng: -96.313606 } 
  },
  lawn: { lotSize: 0.33, turfType: "Zoysia", lastMowed: calcLastMowed(12) }
});
clientList.push({
  name: "Lauren Ramirez",
  phone: 7138592038,
  location: { 
    streetAddress: "1603 Francis Dr, College Station, TX 77840", 
    coordinates: { lat: 30.635306, lng: -96.313084 } 
  },
  lawn: { lotSize: 0.66, turfType: "St. Augustine", lastMowed: calcLastMowed(1) }
});
clientList.push({
  name: "Joshua Martinez",
  phone: 9364828102,
  location: { 
    streetAddress: "200 College View Dr, Bryan, TX 77801", 
    coordinates: { lat: 30.633307, lng: -96.350066 } 
  },
  lawn: { lotSize: 0.25, turfType: "St. Augustine", lastMowed: calcLastMowed(0) }
});
clientList.push({
  name: "Miguel Hernandez",
  phone: 9798271038,
  location: { 
    streetAddress: "3808 Ridgewood St, Bryan, TX 77801", 
    coordinates: { lat: 30.635153, lng: -96.347800 } 
  },
  lawn: { lotSize: 0.47, turfType: "St. Augustine", lastMowed: calcLastMowed(3) }
});
clientList.push({
  name: "Lindsey Velasco",
  phone: 9369182793,
  location: { 
    streetAddress: "306 Day Ave, Bryan, TX 77801", 
    coordinates: { lat: 30.635465, lng: -96.350541 } 
  },
  lawn: { lotSize: 0.25, turfType: "Bermuda", lastMowed: calcLastMowed(2) }
});
clientList.push({
  name: "Daniel Johnson",
  phone: 7132638390,
  location: { 
    streetAddress: "306 Crescent Dr, Bryan, TX 77801", 
    coordinates: { lat: 30.632217, lng: -96.347544 } 
  },
  lawn: { lotSize: 0.52, turfType: "St. Augustine", lastMowed: calcLastMowed(2) }
});

db.Client.remove({}, function(err, clients){
  if (err) {
    console.log('Error occured in remove',err);
  } else {
    console.log('Success in remove');

    db.Client.create(clientList, function(err, clients){
      if (err) { return console.log('ERROR', err); }
      console.log("All clients:", clients);
      console.log("Created", clients.length, "clients");
      process.exit();
    });
  }
});
