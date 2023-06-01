const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'assets/img/',
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = file.originalname.replace(ext, '');
        cb(null, filename + '-' + Date.now() + ext);
    },
});

const uploadImg = multer({ storage: storage }).single('image');

module.exports = uploadImg;