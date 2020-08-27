const departs = document.querySelectorAll(".departs");
const desAirport = document.querySelector("#desAirports");
const newTicketButton = document.querySelector("ticketButton");
const message = document.querySelector("#message");

$(function () {
  $('[data-toggle="popover"]').popover()
})

// $(function () {
  $('#eTicket').popover({
    html: true,
    trigger: 'focus',
    title: 'Your eTickets',
    content: function() {
      return $("#popover-content").html();
    }
  })
// })

function setArrival() {
  departs.forEach((date) => {
    if (new Date(date.innerHTML) < new Date()) {
      date.classList.add("red");
    }
  });
}

if (desAirport === null) {
  message.innerText =
    "You must add at least one destination to add a new ticket";
}

setArrival();
