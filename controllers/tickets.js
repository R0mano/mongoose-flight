const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  new: newTicket,
  addNewTicket,
  delete: deleteOneTicket
};

function newTicket(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    // Ticket.find({flight: flight._id}, function(err, ticket) {
    const price = Math.floor(Math.random() * 1000) + 100;

    let classes = [
      { name: "Economy", price: price },
      { name: "Business", price: price * 3 },
      { name: "Premiere", price: price * 5 },
    ];

    if (flight.destinations.length) {
      res.render("tickets/new", {
        title: "New Ticket",
        flight,
        classes: classes,
      });
    } else {
      res.redirect(`/flights/${flight._id}`);
    }
  });
  // });
}

function addNewTicket(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    Ticket.create(req.body, function (err, ticket) {
      ticket.seat = req.body.seat;
      ticket.price = req.body.price;
      ticket.flight = req.params.id;
      ticket.save(function (err) {
        res.redirect(`/flights/${req.params.id}`);
      });
    });
  });
  // console.log(req.body, 'this is req.body');
  // console.log(req.params, 'this is req.params');
}

function deleteOneTicket(req, res) {
  console.log(req.body.ticket, 'This is req.body.ticket');
  console.log(req.params.id, 'this is req.params');
  Flight.findById(req.params.id, function (err, flight) {
    Ticket.findOneAndDelete(req.body.ticket, function(err, ticket) {
      if (err) {console.log(err);}
      ticket.save;
      res.redirect(`/flights/${flight._id}`);
    })
  })
}
