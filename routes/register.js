var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', function(req, res) {
  Account.register(new Account({ email : req.body.email }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register');
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

module.exports = router;
