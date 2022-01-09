const bcrypt = require("bcrypt");

const User = require("../models/user");

// Register new user
exports.signup = async (req, res, next) => {
  let hash = "";
  try {
    hash = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    res.status(500).json({ error });
  }
  try {
    console.log(hash);
    const user = new User({ email: req.body.email, password: hash });
    await user.save();
    res.status(201).json({ message: "Utilisateur crée !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// exports.signup = (req, res, next) => {
//   bcrypt
//     .hash(req.body.password, 10)
//     .then((hash) => {
//       const user = new User({
//         email: req.body.email,
//         password: hash,
//       });
//       user
//         .save()
//         .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
//         .catch((error) => res.status(400).json({ error }));
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

// Connect existing user.
exports.login = (req, res, next) => {};
