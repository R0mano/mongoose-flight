const Flight = require("../models/flight");
const Ticket = require('../models/ticket');

module.exports = {
  index,
  new: newFlight,
  create,
  show,
};

function index(req, res) {
  Flight.find({}, function (err, flights) {
    flights.sort((a, b) => a.departs - b.departs);
    res.render("flights/index", { title: "All Flights", flights });
    // console.log(flights);
  });
}

function newFlight(req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs;
  const departsDate = dt.toISOString().slice(0, 16);
  res.render("flights/new", { title: "New Flight", departsDate });
}

function create(req, res) {
  const flight = new Flight(req.body);
  // console.log(flight, 'Newly Created Flight');
  flight.save(function (err) {
    if (err) {
      console.log(err);
      return res.render("flights/new", { title: "New Flight" });
    }
  });
  res.redirect("/flights");
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    Ticket.find({ flight: flight._id }, function (err, tickets) {
      flight.destinations.sort(
        (a, b) => a.arrival.getTime() - b.arrival.getTime()
      );
      destinationEnums = flight.schema.path("destinations.airport").enumValues;
      let usedAirports = flight.destinations.map((f) => f.airport);
      usedAirports.push(flight.airport);
      //Filter usedAirports to display allowedDestinations
      let allowedDestinations = destinationEnums.filter(
        (a) => !usedAirports.includes(a)
      );
      console.log(tickets, 'this is ticket');
      res.render("flights/show", {
        title: "Flight Details",
        flight,
        allowedDestinations,
        tickets
      });
    });
  });
}
