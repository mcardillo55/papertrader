var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
  name: String,
  stocks: [{ symbol: String }]
});

var Portfolio = mongoose.model('Portfolio', portfolioSchema);
