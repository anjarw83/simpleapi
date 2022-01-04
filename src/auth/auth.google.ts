import * as passport from "passport";
import * as passportGoogle from "passport-google-oauth20";
import { Request, Response } from "express";
const GoogleStrategy = passportGoogle.Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

const googlePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect"
      },
      (accessToken, refreshToken, profile, done) => {
        // get profile details
        // save profile details in db
        return done(null, profile);
      }
    )
  );
  passport.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: "/error"
  });
};

const redirect = () => {
  passport.authenticate("google", (req: Request, res: Response) => {
    res.send("This is the callback route");
  });
};

const authGoogle = {
  googlePassport,
  redirect
};

export default authGoogle;
