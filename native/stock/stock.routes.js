const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const stockService = require("./stock.service");
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
  const result = await stockService.getStock(req);

  res.status(200).json({ data: result });
});

router.patch("/:id/watchlist", jsonParser, async (req, res) => {
  console.log(`>>> Entering updateWatchlist : ${JSON.stringify(req.params)}`);
  console.log(`>>> Entering updateWatchlistUpdateTo : ${JSON.stringify(req.body.params)}`);
  await stockService.updateWatchlist(req);

  res.status(201).json({ data: "success" });
});

module.exports = router;
