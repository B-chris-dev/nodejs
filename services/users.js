// on importe le odèle de données
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ajouter un user
exports.add = async (req, res, next) => {
  const temp = {
    name: req.body.name,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    await User.create(temp);

    return res.redirect("/dashboard");
  } catch (error) {
    return res.status(501).json(error);
  }
};

//modifier un user
exports.update = async (req, res, next) => {
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
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          user[key] = temp[key];
        }
      });

      await user.save();
      return res.redirect("/dashboard");
    }

    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

// supprimer un user
exports.delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    await User.deleteOne({ _id: id });

    return res.redirect("back");
  } catch (error) {
    return res.status(501).json(error);
  }
};

//vérification du mot de passe
exports.authenticate = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne(
      { email: email },
      "-__v -createdAt -updateAt"
    );

    if (!user) {
      return res.status(404).json("user_not_found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

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
