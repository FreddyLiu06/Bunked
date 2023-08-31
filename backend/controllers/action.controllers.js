// Methods to change and update the actions of the users
let Action = require('../models/action.model');
let User = require('../models/user.model');
let UserBio = require('../models/user.bio.model');

const recommender = require('../scripts/recommender');

// Gets all other users that a given user has accepted
// Input URL params: req.query.email, email of the base user
// Output: Array of USER objects that user has accepted
const getAccepted = async (req, res) => {

    const baseUserEmail = req.query.email;
    const baseUser = await User.findOne({email: baseUserEmail});

    if (!baseUser) {
        return res.status(404).json('User does not exist');
    }

    // Get all pairings of the base user where the base user has accepted
    const pairings = await Action.find({baseUserEmail: baseUserEmail, actionType: 0});

    // Get email addresses of all the target users
    const targetEmails = pairings.map(pair => pair.targetUserEmail);

    // Get target users
    const targetUsers = await User.find({email: {$in: targetEmails}});
    
    return res.status(200).json(targetUsers);
}

// Helper function that recommends the next user after an acceptance or rejection
// Params: baseEmail is email address of the base person
// Output: user object of the recommended person
// ASSUMES that all of the fields are filled in (except for hobbies, images, dorm, music, shows)
const getNextRecommend = async (baseEmail) => {  
    // Check if input user exists
    const baseuser = await User.findOne({email: baseEmail});
    if (!baseuser) {
        return null;
    }
    
    const baseuserbio = await UserBio.findOne({email: baseEmail});
    if (!baseuserbio) {
        return null;
    }
    
    let nearestUsers = await recommender.findNearest(baseuserbio, 1); // Can change the number in the second parameter to get larger/smaller number of recommendations
    nearestUsers = nearestUsers.map(userArr => userArr[0]);
    
    return nearestUsers[0];
}

// Route used when base user accepts target user
// Input body: req.body.baseEmail email of base user, req.body.targetEmail email of accepted user
const acceptUser = async (req, res) => {

    const baseUserEmail = req.body.baseEmail;
    const targetUserEmail = req.body.targetEmail;

    // Check if both user's exist
    const baseUser = await User.findOne({email: baseUserEmail});
    const targetUser = await User.findOne({email: targetUserEmail});

    if (!baseUser || !targetUser) {
        return res.status(404).json('User does not exist');
    }

    // See if there is already record
    const numExists = await Action.count({baseUserEmail: baseUserEmail, targetUserEmail: targetUserEmail, actionType: 0});
    if (numExists > 0) {
        return res.status(409).json('Error: User already accepted');
    }

    // Add to database
    const actionType = 0;
    
    const newUpdate = {
        actionType: actionType
    }

    try {
        await Action.findOneAndUpdate({"baseUserEmail": baseUserEmail, "targetUserEmail": targetUserEmail, "actionType": 1}, newUpdate);
    } catch (err) {
        console.log('shit');
        return res.status(400).json('Error: ' + err);
    }

    const nextUser = await getNextRecommend(baseUserEmail);
    if (nextUser === null) {
        return res.status(400).json('Recommender error');
    }

    const waitRoomAdded = await addToWaitingRoom(baseUserEmail, nextUser.email);
    if (waitRoomAdded === null) {
        return res.status(400).json('New waitroom error');
    }

    return res.status(201).json('New User Accepted');

}

// Gets all other users that a given user has rejected
// Input URL params: req.query.email, email of the base user
// Output: Array of USER objects that user has rejected
const getRejected = async (req, res) => {

    const baseUserEmail = req.query.email;
    const baseUser = await User.findOne({email: baseUserEmail});

    if (!baseUser) {
        return res.status(404).json('User does not exist');
    }

    // Get all pairings of the base user where the base user has accepted
    const pairings = await Action.find({baseUserEmail: baseUserEmail, actionType: 2});

    // Get email addresses of all the target users
    const targetEmails = pairings.map(pair => pair.targetUserEmail);

    // Get target users
    const targetUsers = await User.find({email: {$in: targetEmails}});
    
    return res.status(200).json(targetUsers);
}

// Route used when base user rejects target user
// Input body: req.body.baseEmail email of base user, req.body.targetEmail email of rejected user
const rejectUser = async (req, res) => {

    const baseUserEmail = req.body.baseEmail;
    const targetUserEmail = req.body.targetEmail;

    // Check if both user's exist
    const baseUser = await User.findOne({email: baseUserEmail});
    const targetUser = await User.findOne({email: targetUserEmail});

    if (!baseUser || !targetUser) {
        return res.status(404).json('User does not exist');
    }

    // See if there is already record
    const numExists = await Action.count({baseUserEmail: baseUserEmail, targetUserEmail: targetUserEmail, actionType: 2});
    if (numExists > 0) {
        return res.status(409).json('Error: User already rejected');
    }

    // Add to database
    const actionType = 2;
    
    const newUpdate = {
        actionType: actionType
    }

    try {
        await Action.findOneAndUpdate({"baseUserEmail": baseUserEmail, "targetUserEmail": targetUserEmail, "actionType": 1}, newUpdate);
    } catch (err) {
        console.log('shit');
        return res.status(400).json('Error: ' + err);
    }

    const nextUser = await getNextRecommend(baseUserEmail);
    if (nextUser === null) {
        return res.status(400).json('Recommender error');
    }

    const waitRoomAdded = await addToWaitingRoom(baseUserEmail, nextUser.email);
    if (waitRoomAdded === null) {
        return res.status(400).json('New waitroom error');
    }

    return res.status(201).json('User Rejected');
}

// Gets all other users in given user's waiting room
// Input URL params: req.query.email, email of the base user
// Output: Array of USER objects of users in the base user's waiting room
const getUsersInWaitingRoom = async (req, res) => {

    const baseUserEmail = req.query.email;
    const baseUser = await User.findOne({email: baseUserEmail});

    if (!baseUser) {
        return res.status(404).json('User does not exist');
    }

    // Get all pairings of the baseUser
    const pairings = await Action.find({baseUserEmail: baseUserEmail, actionType: 1});

    // Get email addresses of all the target users
    const targetEmails = pairings.map(pair => pair.targetUserEmail);

    // Get target users
    const targetUsers = await UserBio.find({email: {$in: targetEmails}});
    
    return res.status(200).json(targetUsers);
}

// Add a user to a given user's waiting room
// Param baseEmail, targetEmail: emails of the base person and person to be added
const addToWaitingRoom = async (baseEmail, targetEmail) => {

    const baseUserEmail = baseEmail;
    const targetUserEmail = targetEmail;

    // Check if both user's exist
    const baseUser = await User.findOne({email: baseUserEmail});
    const targetUser = await User.findOne({email: targetUserEmail});

    if (!baseUser || !targetUser) {
        return null;
    }

    // See if there is already record
    const numExists = await Action.count({baseUserEmail: baseUserEmail, targetUserEmail: targetUserEmail, actionType: 1});
    if (numExists > 0) {
        return null;
    }

    // Add to database
    const actionType = 1;
    
    const newPair = new Action({
        baseUserEmail,
        targetUserEmail,
        actionType,
    })

    newPair.save().then(() => {return 'Added to wait room'})
        .catch(err => {return null})
}

// Add a user to a given user's waiting room
// Input body content: req.body.baseEmail  email of base user, req.body.targetEmail email of removed user
const removeFromWaitingRoom = async (req, res) => {
    const baseUserEmail = req.body.baseEmail;
    const targetUserEmail = req.body.targetEmail;

    // Check if both users exist
    const baseUser = await User.findOne({email: baseUserEmail});
    const targetUser = await User.findOne({email: targetUserEmail});

    if (!baseUser || !targetUser) {
        return res.status(404).json('User does not exist');
    }

    // Delete from DB
    const removed = await Action.deleteOne({baseUserEmail: baseUserEmail, targetUserEmail: targetUserEmail, actionType: 1});
    if (removed.deletedCount == 0) {
        return res.status(404).json('User not in waiting room, no records deleted');
    } else {
        return res.status(200).json('Removed from waiting room');
    }
}

// Route to check if two users match
// Input URL params: req.query.firstEmail email of first user, req.query.secEmail email of second user
const checkMatch = async (req, res) => {
    const firstEmail = req.query.firstEmail;
    const secEmail = req.query.secEmail;

    // Check if both users exist
    const user1 = await User.findOne({email: firstEmail});
    const user2 = await User.findOne({email: secEmail});

    if (!user1 || !user2) {
        return res.status(404).json('User does not exist');
    }

    const checkNum = await Action.count({$or: [{baseUserEmail: firstEmail, targetUserEmail: secEmail, actionType: 0}, {baseUserEmail: secEmail, targetUserEmail: firstEmail, actionType: 0}]});

    if (checkNum < 2) {
        return res.json(false);
    } else {
        return res.json(true);
    }
}

// Route to either accept or reject a user from the waiting room
// Input body: req.body.baseEmail email of base user, req.body.targetEmail email of target, req.body.actionType type of action, 0 for accept, 2 for reject
const updateUserWait = async (req, res) => {
    const baseUserEmail = req.body.baseEmail;
    const targetUserEmail = req.body.targetEmail;
    const actionType = req.body.actionType;

    const check = await Action.count({baseUserEmail: baseUserEmail, targetUserEmail: targetUserEmail, actionType: 1});
    if (check === 0) {
        return res.status(404).json('No user in waiting room');
    }

    await Action.updateOne({baseUserEmail: baseUserEmail, targetUserEmail: targetUserEmail, actionType: 1}, {$set: {actionType: actionType}});
    res.status(200).json('Update successful');

}

// Route to generate new recommendations into waiting room
// Input body: req.body.email, email of the user for whom we want to generate new recommendations
const generateNewRecs = async (req, res) => {
    const email = req.body.email;
    
    const baseuserbio = await UserBio.findOne({email: email});
    if (!baseuserbio) {
        return null;
    }
    const nearestUsers = await recommender.findNearest(baseuserbio, 6);

    nearestUsers.forEach(user => {
        const newPair = new Action({
            baseUserEmail: email,
            targetUserEmail: user[0].email,
            actionType: 1
        })

        newPair.save()
    })

    return res.status(200).json("New Recommendations Generated")

}

module.exports = {
    getAccepted,
    acceptUser,
    getRejected,
    rejectUser,
    getUsersInWaitingRoom,
    addToWaitingRoom,
    removeFromWaitingRoom,
    checkMatch,
    updateUserWait,
    generateNewRecs
}