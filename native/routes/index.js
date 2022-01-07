const router = require("express").Router();
const indexRouter = require("../routes/indexRouter");
const authRouter = require("../auth/auth.routes");
const stockRouter = require("../stock/stock.routes");
const watchlistRouter = require("../watchlist/watchlist.routes");

router.use("/", indexRouter);
router.use("/auth", authRouter);
router.use("/stock", stockRouter);
router.use("/watchlist", watchlistRouter);

module.exports = router;
