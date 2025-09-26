const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Catway = new Schema(
  {
    catwayNumber: {
      type: Number,
      trim: true,
      required: [true, "le numéro est requis"],
    },
    type: {
      type: String,
      trim: true,
      required: [true, "l'état est requis"],
    },
    catwayState: {
      type: String,
      trim: true,
      required: [true, "l'état est requis"],
    },
  },
  {
    // on ajoute 2 champs au document createdAt et updateAt
    timestamps: true,
  }
);

module.exports = mongoose.model("Catway", Catway);
