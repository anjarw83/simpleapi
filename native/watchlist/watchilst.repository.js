const WatchlistModel = require("./watchlist.model");

const create = async watchlist => {
  await WatchlistModel.create(watchlist);
};

const getByUserId = async userId => {
  return WatchlistModel.find({ userId: userId });
};

const updateByUserId = async (userId, watchlists) => {
  const filter = { userId: userId };
  const query = {
    $set: {
      items: watchlists,
      updatedAt: new Date()
    }
  };
  const options = { new: true };
  return WatchlistModel.findOneAndUpdate(filter, query, options);
};

const watchlistRepository = {
  getByUserId,
  create,
  updateByUserId
};

module.exports = watchlistRepository;
