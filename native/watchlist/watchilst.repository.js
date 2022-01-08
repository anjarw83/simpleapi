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

const addItems = async (userId, stock) => {
  const filter = { userId: userId };
  const query = {
    $push: {
      items: stock
    }
  };
  const options = { new: true };

  await WatchlistModel.findOneAndUpdate(filter, query, options);
};

const removeItems = async (userId, stockId) => {
  const filter = { userId: userId };
  const query = {
    $pull: {
      items: {
        id: stockId
      }
    }
  };
  const options = { new: true };

  await WatchlistModel.findOneAndUpdate(filter, query, options);
};

const watchlistRepository = {
  getByUserId,
  create,
  updateByUserId,
  addItems,
  removeItems
};

module.exports = watchlistRepository;
