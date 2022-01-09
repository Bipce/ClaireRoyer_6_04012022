const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator"); // Improve errors messages when saving unique data.

const userShema = mongoose.Schema({
  email: { type: String, require: true, unique: true }, // Can't use the same email address.
  password: { type: String, require: true },
});
userShema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userShema);
