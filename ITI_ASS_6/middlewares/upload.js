const multer = require("multer");
const { join } = require("path");
module.exports = (req, res, next) => {
  const dir = join(__dirname, "../public/img");
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => {
      const date = Date.now();
      cb(null, `${date}_${file.originalname}`);
    },
  });
  const fileFilter = (req, file, cb) => {
    switch (file.mimetype) {
      case "image/jpeg":
      case "image/jpg":
      case "image/png":
        cb(null, true);
        break;
      default:
        cb(null, false);
        break;
    }
  };
  const upload = multer({ storage, fileFilter }).single("image");
  return upload;
  //   upload(req, res, (err) => {
  //     console.log(err);
  //   });
};
