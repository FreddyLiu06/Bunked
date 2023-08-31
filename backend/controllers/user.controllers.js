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
    
    // Set all emails to lower case
    const email = req.body.email.toLowerCase();

    if (await User.findOne({email: email})) {
      return res.status(400).json('Email is associated with another account.')
    }

    // Register new user
    const name = req.body.name;
    const password = req.body.password;
    const hashed = bcrypt.hashSync(password, 10);

    const newUser = new User ({
        email: email,
        name: name,
        password: hashed,
    });

    newUser.save()
      .then(() => {
        req.session.user = {
          email,
          name,
        };
        res.json({success: 'User registered!', email});
      })
      .catch(err => res.status(400).json('Error: ' + err));

}

// Login user
exports.loginUser = async (req, res) => {
  
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

  if (!req.body.email || !req.body.password) {
    return res.status(400).json('Email or password field missing.');
  }

  const user = await User.findOne({email: req.body.email.toLowerCase()});
  if (!user) {
    return res.status(400).json("Incorrect email or password.")
  }


  if (await bcrypt.compare(req.body.password, user.password)) {
    req.session.user = {
      email: user.email,
      name: user.name,
    };
    return res.json({success: 'Logged in!', email: user.email});
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

exports.getUserBio = async (req, res) => {
  // Check for bio table
  
  const bio = await UserBio.findOne({email: req.query.email.toLowerCase()});

  if (!req.query.email || !bio) {
    res.json({"notCreated": true})
  } else {
    res.json({
      email: bio.email,
      name: bio.name,
      gender: bio.gender,
      majors: bio.majors,
      year: bio.year,
      extroversion: bio.extroversion,
      cleanliness: bio.cleanliness,
      noise: bio.noise,
      ...(bio.aboutBio && {aboutBio: bio.aboutBio}),
      ...(bio.dorm && {dorm: bio.dorm}),
      ...(bio.greek && {greek: bio.greek}),
      ...(bio.hobbies && {hobbies: bio.hobbies}),
      ...(bio.hometown && {hometown: bio.hometown}),
      ...(bio.shows && {shows: bio.shows}),
      ...(bio.instagram && {instagram: bio.instagram}),
      ...(bio.sleep && {sleep: bio.sleep}),
      ...(bio.guests && {guests: bio.guests}),
      ...(bio.smoke && {smoke: bio.smoke}),
      ...(bio.drink && {drink: bio.drink}),
      ...(bio.music && {music: bio.music}),
    })
  }
}

// Create bio for user
exports.createUserBio = async (req, res) => {
  // Check if params meet validation requirements
  const validationErrors = validate.validationResult(req);

  if (validationErrors.errors.length !== 0) {
    return res.status(400).json('Error: ' + validationErrors.errors[0].msg);
  }

  // Check if email is a registered user and also get user's name
  const email = req.body.email.toLowerCase();

  var user = await User.findOne({email});
  
  if (!user) {
    return res.status(400).json('Error: user not found');
  }

  if (await UserBio.findOne({email})) {
    return res.status(400).json('Error: Bio already exists');
  }

  // Create Bio    
  const name = user.name;
  const gender = req.body.gender;
  const majors = req.body.majors;
  const year = req.body.year;
  const extroversion = req.body.extroversion;
  const cleanliness = req.body.cleanliness;
  const noise = req.body.noise;
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
  const instagram = req.body.instagram;
  
  const newBio = new UserBio ({
    email,
    name,
    gender,
    majors,
    year,
    extroversion,
    cleanliness,
    noise,
    sleep,
    guests,
    dorm,
    greek,
    smoke,
    drink,
    hobbies,
    hometown,
    music,
    shows,
    instagram,
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
  const email = req.body.email.toLowerCase();
  const aboutBio = req.body.aboutBio
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
  const instagram = req.body.instagram;

  // Embed hobbies into vectors
  const model_embedder = req.app.get('encoder');
  const hobbies_encoded = await recommender.embed(model_embedder, hobbies);

  const filter = {
    email
  };

  const update = {
    ...(aboutBio && {aboutBio}),
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
    ...(instagram && {instagram}),
    ...(hobbies_encoded && {hobbies_encoded}),
  }

  UserBio.findOneAndUpdate(filter, update)
    .then(() => res.json('Bio Updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

// Function that gives (10) recommendations based on nearest neighbors
// Input URL parameters req.query.email: email address of the base person
// Output res: JSON array of (10) user objects of the 10 recommended people
// ASSUMES that all of the fields are filled in (except for hobbies, images, dorm, music, shows)
exports.recommendUsers = async (req, res) => {
  
  // Check if input user exists
  const baseuser = await User.findOne({email: req.query.email});
  if (!baseuser) {
    return res.status(400).json("User not found");
  }

  const baseuserbio = await UserBio.findOne({email: req.query.email});
  if (!baseuserbio) {
    return res.status(400).json("User bio not completed");
  }

  let nearestUsers = await recommender.findNearest(baseuserbio, 10); // Can change the number in the second parameter to get larger/smaller number of recommendations
  nearestUsers = nearestUsers.map(userArr => userArr[0])

  res.json(nearestUsers);
}