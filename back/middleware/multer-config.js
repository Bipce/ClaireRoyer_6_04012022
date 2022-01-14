const multer = require("multer"); // Package for managing files.

// Create dictionary.
const MINE_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

// Configure the path and filename for incoming files.
const storage = multer.diskStorage({
  //Register the files in folder "images"
  destination: (req, file, callback) => callback(null, "images"),
  // Add a timestamp (Date.now) as file name.
  filename: (req, file, callback) => {
    // Use MINE to resolve the appropriate file extension.
    const extension = MINE_TYPES[file.mimetype];
    callback(null, Date.now() + "." + extension);
  },
});

// Export multer already configured , passing const storage, and indicate that we generate only the downloads image files.
module.exports = multer({ storage }).single("image");
