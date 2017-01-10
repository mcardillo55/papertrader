var express = require('express');
var router = express.Router();
var Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
  Account.find({}).select('portfolios').exec(function(err, query) {
    var allPortfolios = Array();
    for (var idx=0; idx<query.length; idx++){
      allPortfolios = allPortfolios.concat(query[idx].portfolios);
    }
    res.render('index', { user : req.user, portfolios : allPortfolios });
  });
});

module.exports = router;
