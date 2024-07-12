const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../../THHEdu/client/public/uploads/avatar'));
  },
  filename: function (req, file, cb) {
    // Ensure to keep the file extension
    const ext = path.extname(file.originalname);
    const fileName = path.parse(file.originalname).name
    cb(null, 'Avatar-'+fileName+ext);
  }
});

// Initialize multer upload object
const upload = multer({ storage: storage });

module.exports = upload;
