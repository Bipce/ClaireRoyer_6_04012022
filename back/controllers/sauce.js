const Sauce = require("../models/sauce");
const fs = require("fs");

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
  const sauceObject = req.file
    ? { ...JSON.parse(req.body.sauce), imageUrl: `${req.protocol}://${req.get("host")}/${req.file.path}` }
    : { ...req.body };

  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    if (!sauce) return res.status(404).json({ error: "Objet non trouvé !" });
    if (req.userId !== sauce.userId) throw "User ID non valable !";
    await Sauce.findByIdAndUpdate(req.params.id, { ...sauceObject, _id: req.params.id });
    res.status(200).json({ message: "Objet modifié !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteSauce = async (req, res, next) => {
  let sauce;
  try {
    sauce = await Sauce.findOne({ _id: req.params.id });
    if (!sauce) return res.status(404).json({ error: "Objet non trouvé !" });
  } catch (error) {
    return res.status(500).json({ error });
  }
  const filename = sauce.imageUrl.split("/images/")[1];
  fs.unlink(`images/${filename}`, async () => {
    try {
      await Sauce.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Objet supprimé !" });
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};

exports.getSauces = async (req, res, next) => {
  try {
    const sauces = await Sauce.find();
    res.status(200).json(sauces);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getSauce = async (req, res, next) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    if (!sauce) return res.status(404).json({ error: "Objet non trouvé !" });
    res.status(200).json(sauce);
  } catch (error) {
    res.status(400).json({ error });
  }
};
