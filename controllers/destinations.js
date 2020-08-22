const Flight = require("../models/flight");

module.exports = {
  create
};

function create (req, res) {
  
  Flight.findById(req.params.id, function (err, flight) {
    console.log(flight.departs);
    req.body.arrival = new Date(flight.departs.getTime() + (Math.floor((Math.random() * 480)) + 60)*60000);
    flight.destinations.push(req.body);
    flight.save(function (err) {
      console.log(flight, 'this is the flight Document');
      res.redirect(`/flights/${flight._id}`);
    });
  });
}