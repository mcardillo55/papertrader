var YQL = require('yql');
var mongoose = require('mongoose');
var Stock = require('../models/stock.js')

var getPrice = function(symbol) {
  var query = new YQL('select * from yahoo.finance.quotes where symbol = "' + symbol + '"');
  query.exec( function(error, response) {
    var response = response.query.results.quote;
    var stock = Stock.findOneAndUpdate({ ticker: symbol }, { last: response.LastTradePriceOnly,
                                                  ask: response.Ask,
                                                  bid: response.Bid }, function(err, stock) {
                                                    console.log("Price for " + symbol + " updated.");
                                                  });
  });

}

mongoose.connect('mongodb://localhost/stock-prices');
var stocks = Stock.find({}).select('ticker').exec(function (err, stocks) {
  for (var idx=0; idx < stocks.length; idx++) {
    getPrice(stocks[idx].ticker);
  }
});
