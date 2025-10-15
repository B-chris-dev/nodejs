const userService = require("../services/users");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

// ajouter un user
exports.addUser = async (req, res, next) => {
  const temp = {
    name: req.body.name,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    userService.add(temp);

    return res.redirect("/dashboard");
  } catch (error) {
    return res.status(501).json(error);
  }
};

//modifier un user
exports.updateUser = async (req, res, next) => {
  const nid = req.body.id;
  const temp = {
    name: req.body.name,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    let user = await User.findOne({ _id: nid });

    if (user) {
      userService.update(nid, temp);
      await userService.save(user);
      return res.redirect("/dashboard");
    }

    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

//supprimer un user
exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    await userService.delete({ _id: id });
    return res.redirect("back");
  } catch (error) {
    return res.status(501).json(error);
  }
};

//vérification mot de passe
exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne(
      { email: email },
      "-__v -createdAt -updateAt"
    );

    if (!user) {
      return res.status(404).json("user_not_found");
    }

    const isMatch = userService.authenticate(email, password);

    if (!isMatch) {
      return res.status(403).json("wrong_credentials");
    }

    const userObj = user.toObject();
    delete userObj.password;

    const expireIn = 24 * 60 * 60;

    const token = jwt.sign({ user: userObj }, process.env.SECRET_KEY, {
      expiresIn: expireIn,
    });

    res.header("Authorization", "Bearer " + token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: expireIn * 1000,
    });

    return res.redirect("/dashboard");
  } catch (error) {
    return res.status(500).json("server_error");
  }
};
