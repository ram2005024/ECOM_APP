import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "development"
          ? "https://ecom-app-psi0.onrender.com/auth/user/google/callback"
          : "http://localhost:8000/auth/user/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        //Check if the user exists or not----
        const email = profile.emails[0].value;
        let user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        //If user already exists redirect them to the controller
        if (user) {
          return cb(null, user);
        }
        //If user doesnot exist then create a new user
        user = await prisma.user.create({
          data: {
            name: profile.displayName,
            email,
            image: profile.photos[0].value,
          },
        });
        return cb(null, user);
      } catch (error) {
        cb(error, null);
      }
    }
  )
);
