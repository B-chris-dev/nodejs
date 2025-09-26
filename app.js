var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var catwaysRouter = require("./routes/catways");
const mongodb = require("./db/mongo");

mongodb.initClientDbConnection();

var app = express();

app.use(
  cors({
    exposedHeaders: ["Authorization"],
    origin: "*",
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catways", catwaysRouter);
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render("error");
  console.error(err); // log en console
  res.status(err.status || 500).json({
    error: err.message || "server_error",
  });
});

module.exports = app;
