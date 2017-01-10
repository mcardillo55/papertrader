var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var router = express.Router();

/* GET portfolios page. */
router.get('/', ensureLoggedIn('/login'), function(req, res, next) {
  res.render('portfolios', { user : req.user });
});

module.exports = router;
