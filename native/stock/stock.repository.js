const Stock = require("./stock.model");

const getStock = async (search = null, page = 1, limit = 20) => {
  const skip =
    !page || Number(page) === 1 ? 0 : (Number(page) - 1) * Number(limit);
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
            $regex: `.*${search}.*`,
            $options: "i"
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

const getStockById = async id => await Stock.findOne({ id });

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
  getStockById,
  getStock,
  toggleWatchlist
};

module.exports = stockRepository;
