const mongoose = require("mongoose");

const userShema = mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

module.exports = mongoose.model("User", userShema);
