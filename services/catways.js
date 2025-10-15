// on importe le odèle de données
const Bookings = require("../models/bookings");
const Catway = require("../models/catways");

// ajouter un catway
exports.add = (temp) => {
  Catway.create(temp);
};

//modifier un catway
exports.update = async (id, temp) => {
  let catway = await Catway.findOne({ _id: id });

  Object.keys(temp).forEach((key) => {
    if (!!temp[key]) {
      catway[key] = temp[key];
    }
  });

  catway.save();
};

//save
exports.save = async (data) => {
  await data.save();
};

// supprimer un catway
exports.delete = async (data) => {
  await Catway.deleteOne(data);
};

//réserver un catway
exports.addbooking = async (temp) => {
  await Bookings.create(temp);
};

// supprimer une réservation
exports.deleteBooking = async (data) => {
  await Bookings.deleteOne(data);
};
