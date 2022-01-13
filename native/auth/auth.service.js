const authenticate = passport => {
  passport.authenticate("google", { scope: ["profile", "email"] });
};

module.exports = {
  authenticate
};
