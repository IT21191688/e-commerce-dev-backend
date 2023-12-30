/*
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./user/user.model";

import config from "./common/config";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_REDIRECT_URL,
    },
    async (accessToken, refreshToken, profile: any, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        console.log(user);

        if (!user) {
          // If the user doesn't exist, create a new user in the database using Google profile data
          user = new User({
            googleId: profile.id,
            firstname: profile.name?.givenName || "",
            lastname: profile.name?.familyName || "",
            email: profile.emails?.[0].value || "",
            role: "user",
          });

          await user.save();
        }

        return done(null, user);
      } catch (err: any) {
        //console.log("Ffffffffffff");
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
*/
