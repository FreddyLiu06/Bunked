let Matching = require('../models/matching.model');
// let User = require('../models/user.model');

const crypto = require('crypto')

exports.findMatching = async (req, res) => {
    
}

// Create new matching in Matching model
// Input body: req.body.email1 and req.body.email2, emails of the two people that are matched
// 
exports.createMatching = async (req, res) => {
    let email1 = req.body.email1;
    let email2 = req.body.email2;

    // Make sure that email1 is always smaller than email2
    if (email1 > email2) {
        let temp = email1;
        email1 = email2;
        email2 = temp;    
    }
    // In matching model, it is assumed that email1 is smaller than email2

    // Set the chatID to be the hash of the 2 emails
    const chatID = crypto.createHash('md5').update(email1 + email2).digest('hex');

    const newMatch = new Matching({
        userA: email1,
        userB: email2,
        chatID: chatID
    })

    newMatch.save().then(() => {
        res.status(200).json('Match Created')
    }).catch(err => {
        res.status(400).json(err)
    })
}