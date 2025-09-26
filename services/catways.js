// on importe le odèle de données
const Bookings = require("../models/bookings");
const Catway = require("../models/catways");

// ajouter un catway
exports.add = async (req, res, next) => {
  const temp = {
    catwayNumber: req.body.catwayNumber,
    type: req.body.type,
    catwayState: req.body.catwayState,
  };

  try {
    await Catway.create(temp);

    return res.redirect("/catwaysList");
  } catch (error) {
    return res.status(501).json(error);
  }
};

//modifier un catway
exports.update = async (req, res, next) => {
  const id = req.body.id;
  const temp = {
    catwayNumber: req.body.catwayNumber,
    type: req.body.type,
    catwayState: req.body.catwayState,
  };

  try {
    let catway = await Catway.findOne({ _id: id });

    if (catway) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          catway[key] = temp[key];
        }
      });

      await catway.save();
      return res.redirect("/catwaysList");
    }

    return res.status(404).json("catway_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

// supprimer un catway
exports.delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Catway.deleteOne({ _id: id });

    return res.redirect("back");
  } catch (error) {
    return res.status(501).json(error);
  }
};

//réserver un catway
exports.addbooking = async (req, res, next) => {
  const temp = {
    catwayNumber: req.body.catwayNumber,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
  };

  try {
    await Bookings.create(temp);

    return res.redirect("/bookingsList");
  } catch (error) {
    return res.status(501).json(error);
  }
};

// supprimer une réservation
exports.deleteBooking = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Bookings.deleteOne({ _id: id });

    return res.redirect("back");
  } catch (error) {
    return res.status(501).json(error);
  }
};
