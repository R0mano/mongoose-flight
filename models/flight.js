const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const destinationSchema = new Schema(
  {
    airport: {
      type: String,
      enum: ["ATL", "AUS", "DFW", "DEN", "LAX", "SFO", "JFK", "SEA", "HOU", "LON", "BJS", "TYO", "MRS"],
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
      enum: ["ATL", "AUS", "DFW", "DEN", "LAX", "SFO", "JFK", "SEA", "HOU", "LON", "BJS", "TYO", "MRS"],
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
