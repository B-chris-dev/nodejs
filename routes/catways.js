var express = require("express");
var router = express.Router();

const controller = require("../controllers/catwayController");
const service = require("../services/catways");
const private = require("../middlewares/private");

// la route pour ajouter un catway
router.post("/addCatway", private.checkJWT, controller.addCatway);
// la route pour modifier un catway
router.post("/update/:id", private.checkJWT, controller.updateCatway);
// la route pour supprimer un catway
router.post("/deleteCatway/:id", private.checkJWT, controller.deleteCatway);
// la route pour créer une réservation
router.post("/addBooking", private.checkJWT, controller.addbooking);
// la route pour supprimer une réservation
router.post("/deleteBooking/:id", private.checkJWT, controller.deleteBooking);

module.exports = router;
