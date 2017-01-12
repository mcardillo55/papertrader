var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var router = express.Router();
var Account = require('../models/account');
var Hashids = require('hashids');

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
      initialStocks.push( { ticker: req.body.stocks[stock],
                            quantity: req.body.qty[stock]
                          });
    }
  }
  var hashids = new Hashids(req.body.name);
  var hash = hashids.encodeHex(req.user.id);
  var newPortfolio = { name: req.body.name,
                       hashid: hash,
                       stocks: initialStocks };
  req.user.portfolios.push(newPortfolio);
  req.user.save();
  res.redirect('/portfolios');
});

router.get('/view', function(req, res, next) {
  var hashid = req.query.id;
  Account.findOne({}).where('portfolios.hashid').equals(hashid).select('portfolios.$').exec( function(err, portfolio) {
    console.log(portfolio.portfolios[0].stocks);
    var stocks = portfolio.portfolios[0].stocks;
    res.render('viewPortfolio', { user : req.user, stocks : stocks });
  });
});

module.exports = router;
