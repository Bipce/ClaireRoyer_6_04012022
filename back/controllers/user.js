const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Register new user
exports.signup = async (req, res, next) => {
  let hash;
  try {
    hash = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    res.status(500).json({ error });
  }
  try {
    const user = new User({ email: req.body.email, password: hash });
    await user.save();
    res.status(201).json({ message: "Utilisateur crée !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Connect existing user.
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "Utilisateur non trouvé !" });
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(401).json({ error: "Mot de passe incorrect !" });
    res.status(200).json({
      userId: user._id,
      // Sign use a secret key for to encode a token who can contain a personal payload and have a limited value.
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" }),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
