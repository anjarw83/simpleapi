// import all the things we need
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("mongoose");
const User = require("../users/user.model");

const GOOGLE_CLIENT_ID =
  "781816603387-798ds3jqc2rlb760eebv5oc5aos5dlr2.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect"
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value
        };

        try {
          //find the user in our database
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            //If user present in our database.
            done(null, user);
          } else {
            // if user is not preset in our database save user data to database.
            console.log("saving to db");
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
