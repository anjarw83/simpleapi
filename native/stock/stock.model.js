const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  currency: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  displaySymbol: {
    type: String,
    required: true
  },
  figi: {
    type: String,
    required: true
  },
  isin: {
    type: String,
    required: false
  },
  mic: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  symbol2: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  watchlist: {
    type: Boolean,
    required: false
  }
});

module.exports = mongoose.model("Stock", StockSchema);
