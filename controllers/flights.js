const Flight = require("../models/flight");

module.exports = {
  index,
  new: newFlight,
  create,
  show
};

function index(req, res) {
  Flight.find({}, function (err, flights) {
    flights.sort((a, b) => a.departs - b.departs);
    res.render("flights/index", { flights });
    // console.log(flights);
  });
}

function newFlight(req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs;
  const departsDate = dt.toISOString().slice(0, 16);
  res.render("flights/new", {departsDate});
}

function create(req, res) {
  const flight = new Flight(req.body);
  // console.log(flight, 'Newly Created Flight');
  flight.save(function (err) {
    if (err) {
        console.log(err);
        return res.render("flights/new");
    }
  });
  res.redirect("/flights");
}

function show(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    res.render('flights/show', {title: 'Flight Details', flight});
    // console.log(flight);
  });
}
