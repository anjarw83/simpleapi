const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const routes = require("./routes/index");
const path = require("path");
const googlePassport = require("./auth/googlePassport/passport");

var app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static("public"));
app.set("views", path.join(__dirname, "../native/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);

googlePassport.init(passport);

// // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(PORT, console.log(`listening at ${PORT}`));
