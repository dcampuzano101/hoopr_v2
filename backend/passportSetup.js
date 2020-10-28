// import passport from "passport";
import googlePassport from "passport-google-oauth20";
// import asyncHandler from "express-async-handler";
// import generateToken from "./utils/generateToken.js";
import User from "./models/userModel.js";

const passportFunction = (passport) => {
  // debugger;
  passport.use(
    new googlePassport.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/users/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        // debugger;
        // const newUser = {
        //   googleId: profile.id,
        //   displayName: profile.displayName,
        //   firstName: profile.name.givenName,
        //   lastName: profile.name.familyName,
        //   image: profile.photos[0].value,
        // };

        // try {
        //   let user = await User.findOne({ googleId: profile.id });

        //   if (user) {
        //     done(null, user);
        //   } else {
        //     user = await User.create(newUser);
        //     done(null, user);
        //   }
        // } catch (err) {
        //   console.error(err);
        // }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

export default passportFunction;
