const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Extraction of the token of the header "Authorization". With split we get everything after the space.
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Decode our token, if not valid: generate error.
    const userId = decodedToken.userId; // Extraction of userId of token.
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({ error: error || "Requête non authentifiée !" });
  }
};
