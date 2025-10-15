// on importe le modèle de données
const User = require("../models/users");
const bcrypt = require("bcrypt");

// ajouter un user
exports.add = async (temp) => {
  await User.create(temp);
};

//save
exports.save = async (data) => {
  await data.save();
};

//modifier un user
exports.update = async (nid, temp) => {
  let user = await User.findOne({ _id: nid });

  Object.keys(temp).forEach((key) => {
    if (!!temp[key]) {
      user[key] = temp[key];
    }
  });
  user.save();
};

// supprimer un user
exports.delete = async (data) => {
  await User.deleteOne(data);
};

//verification du mot de passe
exports.authenticate = async (email, password) => {
  const user = await User.findOne(
    { email: email },
    "-__v -createdAt -updateAt"
  );
  await bcrypt.compare(password, user.password);
};
