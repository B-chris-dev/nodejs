var express = require("express");
var router = express.Router();

const userRoute = require("../routes/users");
const User = require("../models/users");
const catwayRoute = require("../routes/catways");
const Catway = require("../models/catways");
const Bookings = require("../models/bookings");

/* login page. */
router.get("/", async (req, res) => {
  res.render("index", {
    title: "Login",
  });
});

// Dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const users = await User.find();
    return res.render("dashboard", {
      title: "dashboard",
      userList: users,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Add user
router.get("/add_user", async (req, res) => {
  res.render("add_user", {});
});

// Modifier user
router.get("/update_user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    return res.render("update_user", {
      user: user,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// catways list
router.get("/catwaysList", async (req, res) => {
  try {
    const catways = await Catway.find();
    return res.render("catwaysList", {
      title: "dashboard",
      catwaysList: catways,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Add catway
router.get("/addCatway", async (req, res) => {
  res.render("add_catway", {});
});

// Modifier catway
router.get("/updateCatway/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const catway = await Catway.findOne({ _id: id });
    return res.render("updateCatway", {
      catway: catway,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// louer catway
router.get("/bookCatway/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const catway = await Catway.findOne({ _id: id });
    return res.render("bookCatway", {
      catway: catway,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});
//Booking list
router.get("/bookingsList", async (req, res) => {
  try {
    const bookings = await Bookings.find();

    return res.render("bookingsList", {
      title: "dashboard",
      bookingsList: bookings,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

//booking details
router.get("/bookingDetails/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Bookings.findOne({ _id: id });
    const checkIn = await booking.checkIn.toLocaleDateString("fr");
    const checkOut = await booking.checkOut.toLocaleDateString("fr");
    return res.render("bookingDetails", {
      booking: booking,
      checkIn: checkIn,
      checkOut: checkOut,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

//catway details
router.get("/catwayDetails/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const catway = await Catway.findOne({ _id: id });

    return res.render("catwayDetails", {
      catway: catway,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.use("/users", userRoute);
router.use("/catways", catwayRoute);

module.exports = router;
