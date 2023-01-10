// Routes for changes to waiting rooms
const express = require('express');

const router = express.Router();

const actionController = require('../controllers/action.controllers');

// Define routes
router.get('/getAccepted', actionController.getAccepted); // Get all users that a given user has accepted
router.post('/acceptUser', actionController.acceptUser); // Accept a user

router.get('/getRejected', actionController.getRejected); // Get all users that a given user has rejected
router.post('/rejectUser', actionController.rejectUser); // Reject a user

router.get('/getWaitUsers', actionController.getUsersInWaitingRoom); // Get all users in a given user's waiting room
router.post('/addUserWait', actionController.addToWaitingRoom); // Add a user to waiting room
router.delete('/removeUserWait', actionController.removeFromWaitingRoom); // Remove user from waiting room


module.exports = router;