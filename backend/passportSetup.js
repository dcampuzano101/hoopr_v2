import googlePassport from "passport-google-oauth20";
import User from "./models/userModel.js";

const passportFunction = (passport) => {
  passport.use(
    new googlePassport.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/users/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const googleUser = profile._json;
        const newUser = {
          username: googleUser.name,
          email: googleUser.email,
        };

        try {
          let user = await User.findOne({ email: googleUser.email });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
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
