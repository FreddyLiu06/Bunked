const bcrypt = require("bcrypt");
let User = require('../models/user.model');
let UserBio = require('../models/user.bio.model')
const validate = require("../middlewares/validators");
const recommender = require("../scripts/recommender");

// Register user
exports.registerUser = async (req, res) => {
    // Check if params meet validation requirements
    
    const validationErrors = validate.validationResult(req);
    const errors = [];

    if (!validationErrors.isEmpty) {
        validationErrors.errors.forEach((error) => {
          errors.push({param: error.param, msg: error.msg});
        });
    }

    if (errors.length) {
        return res.status(400).json({
          error: errors,
        });
    }

    // Register new user
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const hashed = bcrypt.hashSync(password, 10);


    const newUser = new User ({
        email: email,
        name: name,
        password: hashed,
    });

    newUser.save().then(() => res.json('User registered!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
}

// Login user
exports.loginUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json('Email or password field missing.');
  }

  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return res.status(400).json("Incorrect email or password.")
  }


  if (await bcrypt.compare(password, user.password)) {
    req.session.user = {email: user.email};
    return res.json('Logged in!');
  } else {
    return res.status(400).json('Incorrect email or password.');
  }
}

// Logout user
exports.logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json('Error logging out user');
    } else {
      res.clearCookie('session-id');
      res.json('User logged out.');
    }
  })
}

// Create bio for user
exports.createUserBio = async (req, res) => {
    // Check if params meet validation requirements
    const validationErrors = validate.validationResult(req);
    const errors = [];

    if (!validationErrors.errors.isEmpty) {
        validationErrors.errors.forEach((error) => {
          errors.push({param: error.param, msg: error.msg});
        });
    }

    if (errors.length) {
        return res.status(400).json({
          error: errors,
        });
    }

    // create Bio    
    const email = req.body.email;
    const gender = req.body.gender;
    console.log(req.body.majors)

    const majors = req.body.majors;
    const year = req.body.year;
    const extroversion = req.body.extroversion;
    const cleanliness = req.body.cleanliness;
    const noise = req.body.noise;
    
    const newBio = new UserBio ({
      email,
      gender,
      majors,
      year,
      extroversion,
      cleanliness,
      noise,
  });

  newBio.save().then(() => res.json('Bio Created!'))
      .catch(err => res.status(400).json('Error: ' + err));
}

// Update a user's bio
exports.updateUserBio = async (req, res) => {
  // Check if params meet validation requirements
  const validationErrors = validate.validationResult(req);
  const errors = [];
  
  if (!validationErrors.errors.isEmpty) {
      validationErrors.errors.forEach((error) => {
        errors.push({param: error.param, msg: error.msg});
      });
  }

  if (errors.length) {
      return res.status(400).json({
        error: errors,
      });
  }

  console.log(req.body);

  // Check if bio exists and update it
  const email = req.body.email;
  const sleep = req.body.sleep;
  const guests = req.body.guests;
  const dorm = req.body.dorm;
  const greek = req.body.greek;
  const smoke = req.body.smoke;
  const drink = req.body.drink;
  const hobbies = req.body.hobbies;
  const hometown = req.body.hometown;
  const music = req.body.music;
  const shows = req.body.shows;
  const pictures = req.body.pictures;
  const instagram = req.body.instagram;

  // Embed hobbies into vectors
  const model_embedder = req.app.get('encoder');
  const hobbies_encoded = await recommender.embed(model_embedder, hobbies);

  const filter = {
    email
  };

  const update = {
    ...(sleep && {sleep}),
    ...(guests && {guests}),
    ...(dorm && {dorm}),
    ...(greek && {greek}),
    ...(smoke && {smoke}),
    ...(drink && {drink}),
    ...(hobbies && {hobbies}),
    ...(hometown && {hometown}),
    ...(music && {music}),
    ...(shows && {shows}),
    ...(pictures && {pictures}),
    ...(instagram && {instagram}),
    ...(hobbies_encoded && {hobbies_encoded}),
  }

  UserBio.findOneAndUpdate(filter, update)
    .then(() => res.json('Bio Updated!'))
    .catch(err => res.status(400).json('Error: ' + err));

}

// Function that gives (10) recommendations based on nearest neighbors
// Input req.body.email: email address of the base person
// Output res: JSON array of (10) email addresses of the 10 recommended people
// ASSUMES that all of the fields are filled in (except for hobbies, images, dorm, music, shows)
exports.recommendUsers = async (req, res) => {
  
  // Check if input user exists
  const baseuser = await User.findOne({email: req.body.email});
  if (!baseuser) {
    return res.status(400).json("User not found");
  }

  const baseuserbio = await UserBio.findOne({email: req.body.email});
  if (!baseuserbio) {
    return res.status(400).json("User bio not completed");
  }

  const nearestUsers = await recommender.findNearest(baseuserbio, 10); // Can change the number in the second parameter to get larger/smaller number of recommendations

  res.json(nearestUsers);
}