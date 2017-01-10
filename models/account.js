var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Portfolio = require('./portfolio');

var Account = new Schema({
    email: String,
    password: String,
    portfolios: [Portfolio]
});

Account.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('Account', Account);
