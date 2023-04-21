import express from "express";
import {
  signin,
  signup,
  logout,
  passwordchange,
  deleteaccount,
} from "../controllers/user.js";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

const frontend = process.env.FRONTEND_ADDRESS;
const url = frontend + "/socialloginloading";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.get("/naversignin", passport.authenticate("naver"));
router.get("/navercallback", passport.authenticate("naver"), (req, res) => {
  {
    const newUrl = new URL(url);
    newUrl.searchParams.append("name", req.user.name);
    newUrl.searchParams.append("id", req.user.id);
    newUrl.searchParams.append("src", req.user.src);
    newUrl.searchParams.append("email", req.user.email);
    req.login(req.user, (loginError) => {
      if (loginError) {
        console.error("loginError:", loginError);
      }
      console.log("naver login success");
      res.redirect(newUrl);
    });
  }
});

router.get(
  "/googlesignin",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
  })
);
router.get("/googlecallback", passport.authenticate("google"), (req, res) => {
  {
    const newUrl = new URL(url);
    newUrl.searchParams.append("name", req.user.name);
    newUrl.searchParams.append("id", req.user.id);
    newUrl.searchParams.append("src", req.user.src);
    newUrl.searchParams.append("email", req.user.email);
    req.login(req.user, (loginError) => {
      if (loginError) {
        console.error("loginError:", loginError);
      }
      console.log("google login success");
      res.redirect(newUrl);
    });
  }
});

router.get("/logout", logout);
router.patch("/passwordchange", passwordchange);
router.delete("/deleteaccount", deleteaccount);

export default router;
