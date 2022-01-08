const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const watchlistService = require("./watchlist.service");

// Todo (anjarw) : Switch to PATCH
router.post("/:userId", jsonParser, async (req, res) => {
  await watchlistService.create(req);
  res.status(201).json({ data: "success" });
});

router.get("/:userId", async (req, res) => {
  const result = await watchlistService.getByUserId(req);
  res.status(200).json({ data: result });
});

router.patch("/:userId", jsonParser, async (req, res) => {
  await watchlistService.updateByUserId(req);
  res.sendStatus(204);
});

module.exports = router;
