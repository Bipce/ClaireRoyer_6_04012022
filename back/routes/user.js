const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);

// app.post("/api/auth/signup", (req, res, next) => {
//   const user = new User({
//     ...req.body,
//   });
//   user
//     .save()
//     .then(() => res.status(201).json({ message: "Utilisateur enregistré !" }))
//     .catch((error) => res.status(400).json({ error }));
// });

router.post("/login", userCtrl.login);

module.exports = router;
