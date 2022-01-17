const Sauce = require("../models/sauce");
const fs = require("fs");

exports.createSauce = async (req, res, next) => {
  try {
    const sauce = new Sauce({
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/${req.file.path}`,
    });
    await sauce.save();
    res.status(201).json(" message: Sauce enregistrée !");
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
    if (req.body.userId !== sauce.body.userId) throw "User ID non valable !";
    await Sauce.findByIdAndUpdate(req.params.id, { ...sauceObject, _id: req.params.id });
    res.status(200).json({ message: "Objet modifié !" });
  } catch (error) {
    res.status(403).json({ error });
  }
};

exports.deleteSauce = async (req, res, next) => {
  let sauce;
  try {
    sauce = await Sauce.findOne({ _id: req.params.id });
    if (req.body.userId !== sauce.body.userId) throw "User ID non valable !";
    if (!sauce) return res.status(404).json({ error: "Objet non trouvé !" });
  } catch (error) {
    return res.status(403).json({ error });
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

exports.likeSauce = async (req, res, next) => {
  const { like } = req.body;
  const { userId } = req;

  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    if (!sauce) return res.status(404).json({ error: "Objet non trouvé !" });
    const { usersLiked, usersDisliked } = sauce;

    if (like == 1 && !usersLiked.includes(userId) && !usersDisliked.includes(userId)) {
      usersLiked.push(userId);
      sauce.likes++;
    }
    if (like == -1 && !usersDisliked.includes(userId) && !usersLiked.includes(userId)) {
      usersDisliked.push(userId);
      sauce.dislikes++;
    }
    if (like == 0) {
      if (usersLiked.includes(userId)) {
        sauce.likes--;
        sauce.usersLiked = usersLiked.filter(i => i != userId);
      }
      if (usersDisliked.includes(userId)) {
        sauce.dislikes--;
        sauce.usersDisliked = usersDisliked.filter(i => i != userId);
      }
    }
    await sauce.save();
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Like 1 = Aime / -1 = Aime pas / 0 = Annule
// Check if sauce existe.
// Check if body.userId is not like or disliked already. If not Push body.userId.
