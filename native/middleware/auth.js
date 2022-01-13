const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

const ensureGuest = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/log");
  }
};

const createJwtToken = user => {
  return jwt.sign(
    {
      id: user._id,
      googleId: user.googleId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      displayName: user.displayName,
      image: user.image
    },
    TOKEN_KEY,
    { expiresIn: Number(EXPIRES_IN) }
  );
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"] || null;

  if (!authHeader) {
    return res.status(403).send("Authorization Missing");
  }
  try {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, TOKEN_KEY);
  } catch (err) {
    return res.status(401).send("Invalid Token / Token Expired");
  }
  return next();
};

const authMiddleware = {
  ensureAuth,
  ensureGuest,
  createJwtToken,
  verifyToken
};

module.exports = authMiddleware;
