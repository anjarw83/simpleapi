const stockRepository = require("../stock/stock.repository");

const getStock = async request => {
  const search = request.query.search || null;
  const page = request.query.page || 1;
  const limit = request.query.limit || 20;

  return stockRepository.getStock(search, page, limit);
};

const updateWatchlist = async request => {
  const id = request.params.id;
  const status = request.body.watchlist;
  return stockRepository.toggleWatchlist(id, status);
};

const stockService = {
  getStock,
  updateWatchlist
};
module.exports = stockService;
