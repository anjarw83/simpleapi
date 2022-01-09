const WatchlistModel = require("./watchlist.model");

const create = async watchlist => {
  await WatchlistModel.create(watchlist);
};

const getByUserId = async userId => {
  return WatchlistModel.findOne({ userId: userId });
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

  let watchlist = await WatchlistModel.findOneAndUpdate(filter, query, options);
  if (!watchlist) {
    const data = {
      userId: userId,
      items: [stock]
    };
    const newWatchlist = await WatchlistModel.create(data);
    return !!newWatchlist;
  }
};

const removeItems = async (userId, stockId) => {
  const filter = { userId: userId };
  const query = {
    $pull: {
      items: {
        _id: new Object(stockId)
      }
    }
  };
  const options = { new: true };

  const result = await WatchlistModel.findOneAndUpdate(filter, query, options);
  if (result.items.length === 0) {
    await WatchlistModel.findOneAndDelete({
      _id: new Object(result.id)
    });
  }
};

const watchlistRepository = {
  getByUserId,
  create,
  updateByUserId,
  addItems,
  removeItems
};

module.exports = watchlistRepository;
