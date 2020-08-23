const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const destinationSchema = new Schema(
  {
    airport: {
      type: String,
      enum: ["AUS", "DFW", "DEN", "LAX", "SFO"],
    },
    arrival: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const flightSchema = new Schema(
  {
    destinations: [destinationSchema],
    airline: {
      type: String,
      enum: ["American", "Delta", "Southwest", "United", "Air-France"],
    },
    airport: {
      type: String,
      enum: ["ATL", "DFW", "DEN", "LAX", "SFO"],
      default: "DEN",
    },
    flightNo: {
      type: Number,
      min: 10,
      max: 9999,
    },
    departs: {
      type: Date,
      default: function () {
        return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);
