const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Extraction of the token of the header "Authorization". With split we get everything after the space.
    const token = req.headers.authorization.split("")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Decode our token, if not valid: generate error.
    const userId = decodedToken.userId; // Extraction of userId of token.
    if (req.body.userId && req.body.userId !== userId) {
      // If userID, compare to the one extracted of the token. If different trow error. Else next middleware.
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};
