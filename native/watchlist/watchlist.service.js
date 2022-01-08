const watchlistRepository = require("./watchilst.repository");

const updateByUserId = async request => {
  console.log(`>>>> Entering updateByUserId()`);
  const userId = request.params.userId;
  const watchList = request.body.data;
  return await watchlistRepository.updateByUserId(userId, watchList);
};

const getByUserId = async request => {
  return await watchlistRepository.getByUserId(request.params.userId);
};

const create = async request => {
  const data = {
    userId: request.params.userId,
    items: request.body.items,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  console.log(data);
  return await watchlistRepository.create(data);
};

const watchlistService = {
  getByUserId,
  updateByUserId,
  create
};

module.exports = watchlistService;
