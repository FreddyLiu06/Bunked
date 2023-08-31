const express = require('express');

const router = express.Router();

const matchController = require('../controllers/match.controllers')

router.post('/createNewMatch', matchController.createMatching); // Create new matching into the match model

module.exports = router;