//Importing required modules
const express = require("express");
const passport = require("passport");
const UserModel = require("../users/user.model");
const { ensureAuth } = require("../middleware/auth");
const router = express.Router();
const authService = require("../auth/auth.service");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/auth/success");
  }
);

router.get("/google/access-token", ensureAuth, async (req, res) => {
  const user = await UserModel.findOne({ userId: req.params.userId });
  res.status(200).json({ accessToken: user.token });
});

router.get("/success", ensureAuth, async (req, res) => {
  const authProfile = authService.successHandler(req.user);
  res.status(200).json(authProfile);
});

router.get("/logout", (req, res) => {
  console.log("LogoutRequest", req.user);
  req.logout();
  res.redirect("/");
});

module.exports = router;
