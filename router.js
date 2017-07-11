const Authentication = require('./controllers/authentication');

// start MongoDB
// "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"

module.exports = function(app) {

    app.post('/signup', Authentication.signup);
};
