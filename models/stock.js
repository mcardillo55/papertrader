var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
    ticker: { type: String, unique: true },
    bid: { type: Number, default: 0 },
    ask: { type: Number, default: 0 },
    last: { type: Number, default: 0}
});

module.exports = mongoose.model('Stock', Stock);
