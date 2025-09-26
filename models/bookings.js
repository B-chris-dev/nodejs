const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Booking = new Schema({
  catwayNumber: {
    type: Number,
    trim: true,
    required: [true, "le numéro est requis"],
  },
  clientName: {
    type: String,
    trim: true,
    required: [true, "nom client requis"],
  },
  boatName: {
    type: String,
    trim: true,
    required: [true, "nom bateau requis"],
  },
  checkIn: {
    type: Date,
    trim: true,
    required: [true, "date début requise"],
  },
  checkOut: {
    type: Date,
    trim: true,
    required: [true, "date fin requise"],
  },
});

module.exports = mongoose.model("Booking", Booking);
