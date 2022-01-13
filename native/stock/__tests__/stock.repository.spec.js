const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const StockModel = require("../stock.model");
const stockRepository = require("../stock.repository");

describe("StockRepository", () => {
  let mongod;
  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const mongoDbUri = await mongod.getConnectionString();
    await mongoose.connect(mongoDbUri, { useNewUrlParser: true });
    // await mongoose.connect(mongoDbUri, null, null);
  });

  afterEach(async () => {
    expect.hasAssertions();
    await StockModel.remove({});
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it("should return success when get stock by keyword", async () => {
    // Given
    const keyword = "tower";
    const data = {
      currency: "USD",
      description: "CHINA TOWER CORP LTD-H",
      displaySymbol: "CHWRF",
      figi: "BBG00M1C4XG9",
      isin: null,
      mic: "OOTC",
      symbol: "CHWRF",
      symbol2: "",
      type: "Common Stock",
      watchlist: false
    };
    await StockModel.create(data);

    // When
    const result = await stockRepository.getStock(keyword);

    // Then
    expect(result).toBeDefined();
  });

  it("should return success when get stock by id", async () => {
    // Given
    const id = "61d78735b668876cc8045d07";
    const data = {
      _id: Object(id),
      currency: "USD",
      description: "CHINA TOWER CORP LTD-H",
      displaySymbol: "CHWRF",
      figi: "BBG00M1C4XG9",
      isin: null,
      mic: "OOTC",
      symbol: "CHWRF",
      symbol2: "",
      type: "Common Stock",
      watchlist: false
    };
    await StockModel.create(data);

    // When
    const result = await stockRepository.getStockById(id);

    // Then
    expect(result).toBeDefined();
    expect(result.id).toEqual(id);
  });

  it("should return success toggle watchlist", async () => {
    // Given
    const id = "61d78735b668876cc8045d07";
    const data = {
      _id: new Object(id),
      currency: "USD",
      description: "CHINA TOWER CORP LTD-H",
      displaySymbol: "CHWRF",
      figi: "BBG00M1C4XG9",
      isin: null,
      mic: "OOTC",
      symbol: "CHWRF",
      symbol2: "",
      type: "Common Stock",
      watchlist: false
    };
    await StockModel.create(data);

    // When
    const result = await stockRepository.toggleWatchlist(id, true);

    // Then
    expect(result).toBeTruthy();
  });
});
