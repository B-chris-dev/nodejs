// on importe le odèle de données
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// récupérer un user avec son id
exports.getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    let user = await User.findById(id);

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

// ajouter un user
exports.add = async (req, res, next) => {
  const temp = {
    name: req.body.name,
    fistname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    let user = await User.create(temp);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(501).json(error);
  }
};

//modifier un user
exports.update = async (req, res, next) => {
  const id = req.params.id;
  const temp = {
    name: req.body.name,
    fistname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    let user = await user.findOne({ _id: id });

    if (user) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          user[key] = temp[key];
        }
      });

      await user.save();
      return res.status(201).json(user);
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

    return res.status(204).json("delete_ok");
  } catch (error) {
    return res.status(501).json(error);
  }
};

//vérification du mot de passe
exports.authenticate = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne(
      { email: email },
      "-__v -createdAt -updateAt"
    );

    if (user) {
      bcrypt.compare(password, user.password, function (err, response) {
        if (err) {
          throw new Error(err);
        }
        if (response) {
          delete user._doc.pasword;

          const expireIn = 24 * 60 * 60;
          const token = jwt.sign(
            {
              user: user,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: expireIn,
            }
          );
          console.log("Ton Token :", token);
          res.header("Authorization", "Bearer " + token);
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: expireIn * 1000,
          });
          res.status(200).json("authenticate_succeed");
        }

        return res.status(403).json("wrong_credentials");
      });
    } else {
      return res.status(404).json("user_not_found");
    }
  } catch (error) {
    return res.status(501).json(error);
  }
};
