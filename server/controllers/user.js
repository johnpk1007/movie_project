import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import User from "../models/user.js";
import passport from "passport";
import { naverDeleteAccount } from "./naverDeleteAccount.js";
import { googleDeleteAccount } from "./googleDeleteAccount.js";
import { localDeleteAccount } from "./localDeleteAccount.js";
import dotenv from "dotenv";
dotenv.config();

const frontend = process.env.FRONTEND_ADDRESS;
const url = frontend + "/verify";

export const signin = async (
  req,
  res
  // , next
) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return res.status(400);
    }
    if (!user) {
      console.error(user);
      return res.status(404).json(info);
    }
    req.login(user, (loginError) => {
      if (loginError) {
        console.error("loginError:", loginError);
        return res.status(400);
      }
      const fixUser = {
        id: user._id,
        name: user.name,
        src: user.src,
        email: user.email,
      };
      return res.status(200).json({ result: fixUser });
    });
  })(
    req,
    res
    // , next
  );
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, lang } =
    req.body;

  try {
    const existingUser = await User.findOne({ email, src: "local" });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      src: "local",
    });

    const creatorId = result._id;

    const newUrl = new URL(url);
    newUrl.searchParams.append("creatorId", creatorId);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email, // Change to your recipient
      from: "johnpk1007@gmail.com", // Change to your verified sender
      template_id:
        lang === "en"
          ? process.env.SENDGRID_TEMPLATE_ID_VERIFY_ENGLISH
          : process.env.SENDGRID_TEMPLATE_ID_VERIFY_KOREAN,
      dynamic_template_data: {
        url: newUrl,
      },
    };

    sgMail.send(msg);

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const logout = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(404);
    }
  });
  req.session.destroy();
  res.status(200).json({ message: "logout complete!" });
};

export const passwordchange = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;
  try {
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.findOneAndUpdate(
      {
        email: email,
      },
      { password: hashedPassword }
    );

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1hr",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteaccount = async (req, res) => {
  try {
    const { creatorId: id, src } = req.body;
    console.log("body:", req.body);
    if (src === "local") {
      console.log("localDeleteAccountModule activated");
      localDeleteAccount(id, src);
    }
    if (src === "naver") {
      console.log("naverDeleteAccountModule activated");
      naverDeleteAccount(id, src);
    }
    if (src === "google") {
      console.log("googleDeleteAccountModule activated");
      googleDeleteAccount(id, src);
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ error });
  }
};
