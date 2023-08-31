const express = require('express');

// Router
const router = express.Router();

// Controllers
const userControllers = require('../controllers/user.controllers');
const userImgControllers = require('../controllers/user.image.controllers');

// Middlewares
const validate = require('../middlewares/validators');
const multerImg = require('../middlewares/image.multer');
const { restart } = require('nodemon');

// Authorization function
var authorizeUser = async (req, res, next) => {
    if (req.session.user && req.session.user.email) {
        console.log(req.method);
        if (req.method === "POST") {
            if (req.body.email && req.session.user.email == req.body.email) {
                next();
            } else {
                return res.status(401).json('Unauthorized.')
            }
        } else if (req.method === "GET") {
            console.log("METHOD = GET");
            console.log(req.session.user.email);
            console.log(req.query.email);
            if (req.query.email && req.query.email == req.session.user.email) {
                next();
            } else {
                return res.status(401).json('Unauthorized.')
            }
        } else {
            next();
        }
      } else {
        return res.status(401).json('Unauthorized.')
    }
}

var checkLoggedIn = async (req, res) => {
    if (req.session.user) {
        return res.json(req.session.user);
    } else {
        return res.status(401).json('Unauthorized.');
    }
}


// Routes
router.post('/register', validate.validateEmail, validate.validatePassword, userControllers.registerUser);
router.post('/create-bio', authorizeUser, validate.checkBio, userControllers.createUserBio);
router.post('/update-bio', authorizeUser, validate.updateBio, userControllers.updateUserBio);
router.get('/get-bio', authorizeUser, userControllers.getUserBio);
router.post('/profile-pic', multerImg.saveImg, userImgControllers.uploadImage);
router.get('/profile-pic', authorizeUser, userImgControllers.getImage);
router.delete('/profile-pic', authorizeUser, userImgControllers.deleteImage);
router.post('/login', validate.validateEmail, userControllers.loginUser);
router.get('/login', checkLoggedIn);
router.delete('/logout', userControllers.logoutUser);
router.get('/recommend', userControllers.recommendUsers);

router.post('/test', (req, res) => {
    console.log(req.body);
    if (req.session.user) {
        res.json('Logged in as ' + req.session.user);
    } else {
        res.json('Not logged in.');
    }
});


// Extra test route used by Freddy
router.post('/test2', async (req, res) => {
    // const t1 = performance.now();
    // const count = await UserBio.find({$expr: {$lt: [0.5, {$rand: {}}]}});
    // const t2 = performance.now();
    // console.log(t2-t1);
    // res.json(typeof count);
});

module.exports = router;