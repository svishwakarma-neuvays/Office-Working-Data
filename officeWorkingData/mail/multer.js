//cloudinary
const path = require("path");
const multer = require("multer"); // to upload img

//Photo Storage
const photoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    } else {
      cb(null, false);
    }
  },
});
// Photo Upload Middleware
const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported file format" }, false);
    }
  },
  limits: { fileSize: 1024 * 1024 }, // 1 megabyte
});

module.exports = async function(req, res, next) {
    try {
      // Upload the image to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(req.file);
  
      // Optionally, you can delete the local file after uploading to Cloudinary
      // fs.unlinkSync(req.file.path);
  
      // Return the Cloudinary URL in the response
      res.json({ url: cloudinaryUrl });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
module.exports = photoUpload;
