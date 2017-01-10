var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var router = express.Router();
var Portfolio = require('../models/portfolio').Portfolio;

/* GET portfolios page. */
router.get('/', ensureLoggedIn('/login'), function(req, res, next) {
  res.render('portfolios', { user : req.user });
});

router.get('/new', ensureLoggedIn('/login'), function(req, res, next) {
  res.render('createPortfolio', { user : req.user });
});

router.post('/new', ensureLoggedIn('/login'), function(req, res, next) {
  var initialStocks = [];
  for (var stock in req.body.stocks) {
    if(req.body.stocks[stock]) {
      initialStocks.push(req.body.stocks[stock]);
    }
  }
  var newPortfolio = { name: req.body.name, stocks: initialStocks };
  req.user.portfolios.push(newPortfolio);
  req.user.save();
  res.redirect('/portfolios');
});

module.exports = router;
