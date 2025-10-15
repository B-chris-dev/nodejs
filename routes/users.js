var express = require("express");
var router = express.Router();

const controller = require("../controllers/userController");
const service = require("../services/users");
const private = require("../middlewares/private");

// la route pour ajouter un utilisateur
router.post("/addUser", private.checkJWT, controller.addUser);
// la route pour modifier un utilisateur
router.post("/updateUser/:id", private.checkJWT, controller.updateUser);
// la route pour supprimer un utilisateur
router.post("/deleteUser/:id", private.checkJWT, controller.deleteUser);
// login
router.post("/authenticate", controller.authenticateUser);

module.exports = router;
