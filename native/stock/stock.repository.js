const Stock = require("./stock.model");

const getStock = async (search = null, page = null, limit = 20) => {
  const skip = !page || page === 1 ? 0 : page;
  let result = null;
  let query = {};
  if (search) {
    query = {
      $or: [
        {
          currency: search
        },
        {
          description: {
            $regex: `.*${search}.*`
          }
        },
        { displaySymbol: search },
        { figi: search },
        { isin: search },
        { mic: search },
        { symbol: search },
        { type: search }
      ]
    };
  }
  result = await Stock.find(query)
    .skip(skip)
    .limit(limit);
  return result;
};

const toggleWatchlist = async (id, watchlist) => {
  const filter = { _id: new Object(id) };
  const query = { $set: { watchlist: watchlist } };
  const options = { new: true };
  const newStock = await Stock.findOneAndUpdate(filter, query, options);
  if (newStock.watchlist === watchlist) {
    return true;
  }
  return false;
};

const stockRepository = {
  getStock,
  toggleWatchlist
};

module.exports = stockRepository;
