const Flight = require("../models/flight");

module.exports = {
  create,
  delete: deleteOne,
};

function create(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    req.body.arrival = new Date(
      flight.departs.getTime() + (Math.floor(Math.random() * 480) + 60) * 60000
    );
    flight.destinations.push(req.body);
    flight.destinations.sort((a, b) => a.arrival - b.arrival);
    flight.save(function (err) {
      console.log(flight, "this is the flight Document");
      res.redirect(`/flights/${flight._id}`);
    });
  });
}

function deleteOne(req, res) {
  Flight.findById(req.body.id, function (err, flight) {
    if (err) {
      console.log(err);
    } else {
      flight.destinations.forEach(function (des, i) {
        if (des._id.equals(req.params.id)) {
          flight.destinations.splice(i, 1);
        } else {
          console.log("No matching IDs Found");
        }
      });
      flight.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect(`/flights/${flight._id}`);
        }
      });
    }
  });
}
