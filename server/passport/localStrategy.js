import User from "../models/user.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

export default () => {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: true,
        passReqToCallback: false,
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ email: email, src: "local" });
          if (exUser) {
            if (!exUser.email_verified) {
              done(null, false, { message: "email hasn't varified" });
            }
            const result = await bcrypt.compare(password, exUser.password);

            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "Wrong password" });
            }
          } else {
            done(null, false, { message: "User doesn't exist" });
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
