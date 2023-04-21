import passport from "passport";
import local from "./localStrategy.js";
import naver from "./naverStrategy.js";
import User from "../models/user.js";
import google from "./googleStrategy.js";
import verify from "./verifyStrategy.js";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user._id.toString());
  });
  passport.deserializeUser((_id, done) => {
    User.findOne({ _id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  local();
  verify();
  naver();
  google();
};
