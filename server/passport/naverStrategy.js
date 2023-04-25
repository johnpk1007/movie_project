import User from "../models/user.js";
import passport from "passport";
import { Strategy as NaverStrategy } from "passport-naver";
import redisClient from "../models/redis.js";
import dotenv from "dotenv";
dotenv.config();

const backend = process.env.BACKEND_ADDRESS;
const url = backend + "/users/navercallback";

export default () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.CLIENT_ID_NAVER,
        clientSecret: process.env.CLIENT_SECRET_NAVER,
        callbackURL: url,
      },

      async (accessToken, refreshToken, profile, done) => {
        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);
        console.log("profile:", profile);
        try {
          const exUser = await User.findOne({
            id: profile.id,
            src: "naver",
          });
          console.log("exUser:", exUser);
          if (exUser) {
            await redisClient.set(profile.id, refreshToken);
            console.lo("we are done");
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile.emails[0].value,
              name: profile.displayName,
              id: profile.id,
              email_verified: true,
              src: "naver",
            });
            await redisClient.set(profile.id, refreshToken);
            done(null, newUser);
          }
        } catch (error) {
          console.log("err:", err);
          done(err);
        }
      }
    )
  );
};
