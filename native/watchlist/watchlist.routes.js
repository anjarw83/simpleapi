const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const watchlistService = require("./watchlist.service")

router.post("/:userId", jsonParser, async (req, res) => {
  await watchlistService.create(req);
  res.status(201).json({ data: "success" });
});

router.get("/", async (req, res) => {
  const result = await watchlistRepository.getAll();
  res.status(200).json({ data: result });
});

module.exports = router;
