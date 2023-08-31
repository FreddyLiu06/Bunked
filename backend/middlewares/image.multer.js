const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './profile-pics');
    },

    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }

})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (req.session.user.email && req.body.email && req.session.user.email == req.body.email 
        && allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

exports.saveImg = async (req, res, next) => {

    // save img files
    const upload = multer({ storage, fileFilter }).array('pictures', 2);

    upload(req, res, function (err) {
        if (err) {
            res.status(400).json('Error: ' + err);
        } else {
            next()
        }
    });
}