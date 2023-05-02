import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";
import redisClient from "../models/redis.js";
import redis from "redis";
import dotenv from "dotenv";
dotenv.config();

const backend = process.env.BACKEND_ADDRESS;
const url = backend + "/users/googlecallback";

export default () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID_GOOGLE,
        clientSecret: process.env.CLIENT_SECRET_GOOGLE,
        callbackURL: url,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            id: profile.id,
            src: "google",
          });
          if (exUser) {
            console.log("profile.id:", profile.id);
            await redisClient.set(profile.id, refreshToken);
            console.log("we are done");
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile.emails[0].value,
              name: profile.displayName,
              id: profile.id,
              email_verified: true,
              src: "google",
            });
            await redisClient.set(profile.id, refreshToken);
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(err);
        }
      }
    )
  );
};
