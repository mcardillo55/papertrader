var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var router = express.Router();
var Account = require('../models/account');
var Stock = require('../models/stock');
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
      var stockPrice = new Stock({ ticker: req.body.stocks[stock] });
      stockPrice.save();
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
    var stocks = portfolio.portfolios[0].stocks;
    var stockPrices = {};
    for (var idx=0; idx < stocks.length; idx++) {
      stockPrices[stocks[idx].ticker] = 0;
    }

    Stock.find({ ticker: { $in: Object.keys(stockPrices)} }).exec(function (err, prices) {
        for (var idx=0; idx < prices.length; idx++) {
          stockPrices[prices[idx].ticker] = prices[idx].last;
        }
        res.render('viewPortfolio', { user : req.user, stocks : stocks, stockPrices : stockPrices });
      });
    });

});

module.exports = router;
