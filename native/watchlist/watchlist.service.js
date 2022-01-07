const watchlistRepository = require("./watchilst.repository");

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
  create
};

module.exports = watchlistService;
