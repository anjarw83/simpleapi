const mongoose = require("mongoose");
const StockSchema = require("../stock/stock.model").schema;

const WatchlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: {
    type: [StockSchema],
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);
