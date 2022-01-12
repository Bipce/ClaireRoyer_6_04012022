const Sauce = require("../models/sauce");

exports.createSauce = async (req, res, next) => {
  try {
    const sauce = new Sauce({
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/${req.file.path}`,
    });
    await sauce.save();
    res.status(201).json("{ message: Sauce enregistrée !");
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.modifySauce = async (req, res, next) => {
  try {
    Sauce.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    );
    await res.status(200).json({ message: "Objet modifié !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteSauce = async (req, res, next) => {};

exports.getSauces = async (req, res, next) => {
  try {
    const sauces = await Sauce.find();
    res.status(200).json(sauces);
  } catch (error) {
    res.status(400).json({ error });
  }
};
