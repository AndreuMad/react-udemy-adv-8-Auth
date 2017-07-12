const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    // See if a user with the given email exists
    User.findOne({ email: email }, function(err, existingUser) {
        if(err) {
            return next(err);
        }

        // If user with this email exist, return an error
        if(existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }
    });

    // If a user with email does NOT exist, create and save user record
    const user = new User({
        email: email,
        password: password
    });

    user.save(function(err) {
        // this is callback function
        if(err) { return next(err); }

        // Respond to request indicating the user was created
        res.json({ token: tokenForUser(user) });
    });


};
