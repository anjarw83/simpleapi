const WatchlistModel = require("./watchlist.model");

const create = async watchlist => {
  await WatchlistModel.create(watchlist);
};

const getAll = async () => {
  return WatchlistModel.find({});
};

const watchlistRepository = {
  create,
  getAll
};

module.exports = watchlistRepository;
