const Flight = require("../models/flight");

module.exports = {
  index,
  new: newFlight,
  create,
};

function index(req, res) {
  Flight.find({}, function (err, flights) {
    flights.sort((a, b) => b.departs - a.departs);
    res.render("flights/index", { flights });
  });
}

function newFlight(req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs;
  const departsDate = dt.toISOString().slice(0, 16);
  res.render("flights/new", {departsDate});
}

function create(req, res) {
  console.log(req.body);
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) {
        console.log(err);
        return res.render("flights/new");
    }
  });
  // console.log(flight);
  res.redirect("/flights");
}
