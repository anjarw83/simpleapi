const express = require("express");
const { ensureGuest, ensureAuth } = require("../middleware/auth");
const router = express.Router();

router.get("/", ensureGuest, (req, res) => {
  res.render("login");
});

router.get("/log", ensureAuth, async (req, res) => {
  res.render("index", { userinfo: req.user });
});

module.exports = router;
