var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
    ticker: String,
    bid: Number,
    ask: Number,
    last: Number
});

module.exports = mongoose.model('Stock', Stock);
