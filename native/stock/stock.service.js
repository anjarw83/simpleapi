const stockRepository = require("./stock.repository");
const watchlistRepository = require("../watchlist/watchilst.repository");

const getStock = async request => {
  const search = request.query.search || null;
  const page = request.query.page || 1;
  const limit = request.query.limit || 20;

  return stockRepository.getStock(search, page, limit);
};

// Todo : Replace static UserId;
const userId = "61d71a3dd481803a0275b9c5";
const updateWatchlist = async request => {
  const id = request.params.id;
  const status = request.body.watchlist;
  console.log("Status ", status);
  const toggle = await stockRepository.toggleWatchlist(id, status);
  if (!toggle) {
    return false;
  }

  let result = false;
  const stock = await stockRepository.getStockById(id);
  if (status) {
    result = await watchlistRepository.addItems(userId, stock);
  } else {
    result = await watchlistRepository.removeItems(userId, id);
  }
  return result;
};

const stockService = {
  getStock,
  updateWatchlist
};
module.exports = stockService;
