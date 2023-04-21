import User from "../models/user.js";
import passport from "passport";
import { Strategy as VerifyStrategy } from "passport-local";

export default () => {
  passport.use(
    "verify",
    new VerifyStrategy(
      {
        usernameField: "creatorId",
        passwordField: "creatorId",
        session: true,
        passReqToCallback: false,
      },
      async (creatorId, password, done) => {
        console.log("verify passport module activated!");
        try {
          const exUser = await User.findOne({ _id: creatorId, src: "local" });
          if (exUser) {
            if (exUser.email_verified) {
              done(null, false, { message: "email hasn already varified" });
            }
            const verifiedUser = await User.findOneAndUpdate(
              { _id: creatorId, src: "local" },
              { email_verified: true },
              {
                new: true,
              }
            );
            console.log("verifiedUser:", verifiedUser);
            done(null, verifiedUser);
          } else {
            done(null, false, { message: "User doesn't exist" });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
