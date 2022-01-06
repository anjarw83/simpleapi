const router = require("express").Router();
const indexRouter = require("../routes/indexRouter");
const authRouter = require("../auth/auth.routes");

router.use("/", indexRouter);
router.use("/auth", authRouter);

module.exports = router;
