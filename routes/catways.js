var express = require("express");
var router = express.Router();

const service = require("../services/catways");
const private = require("../middlewares/private");

// la route pour ajouter un catway
router.post("/addCatway", private.checkJWT, service.add);
// la route pour modifier un catway
router.post("/update/:id", private.checkJWT, service.update);
// la route pour supprimer un catway
router.post("/deleteCatway/:id", private.checkJWT, service.delete);
// la route pour créer une réservation
router.post("/addBooking", private.checkJWT, service.addbooking);
// la route pour supprimer une réservation
router.post("/deleteBooking/:id", private.checkJWT, service.deleteBooking);

module.exports = router;
