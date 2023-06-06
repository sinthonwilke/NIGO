const path = require('path');
const multer = require('multer');

const imgStorage = multer.diskStorage({
    destination: 'assets/img/',
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = file.originalname.replace(ext, '');
        cb(null, filename + '-' + Date.now() + ext);
    },
});

const userImgStorage = multer.diskStorage({
    destination: 'assets/userImg/',
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = file.originalname.replace(ext, '');
        cb(null, filename + '-' + Date.now() + ext);
    },
});

const uploadImg = multer({ storage: imgStorage }).single('image');
const uploadUserImg = multer({ storage: userImgStorage }).single('image');

module.exports = {
    uploadImg,
    uploadUserImg
};