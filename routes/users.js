var express = require("express");
var router = express.Router();

const service = require("../services/users");
const private = require("../middlewares/private");

// la route pour ajouter un utilisateur
router.post("/addUser", private.checkJWT, service.add);
// la route pour modifier un utilisateur
router.post("/updateUser/:id", private.checkJWT, service.update);
// la route pour supprimer un utilisateur
router.post("/deleteUser/:id", private.checkJWT, service.delete);
// login
router.post("/authenticate", service.authenticate);

module.exports = router;
