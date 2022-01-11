const sauce = require("../models/sauce");
const Sauce = require("../models/sauce");

exports.createSauce = async (req, res, next) => {
  delete req.body__id;
  try {
    const sauce = new Sauce({ ...req.body });
    await sauce.save();
    res.status(201).json("{ message: Sauce enregistrée !");
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.modifySauce = async (req, res, next) => {};

exports.deleteSauce = async (req, res, next) => {};

exports.getSauces = async (req, res, next) => {
  try {
    const sauces = await Sauce.find();
    res.status(200).json({ sauces });
  } catch (error) {
    res.status(400).json({ error });
  }
};
