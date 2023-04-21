import sgMail from "@sendgrid/mail";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import passport from "passport";

import dotenv from "dotenv";
dotenv.config();

export const sendDeleteEmail = async (req, res) => {
  const { email, creatorId, src, lang } = req.body;

  const backend = process.env.BACKEND_ADDRESS;
  const url = backend + "/deletedone";

  const newUrl = new URL(url);
  newUrl.searchParams.append("creatorId", creatorId);
  newUrl.searchParams.append("src", src);

  console.log("newUrl:", newUrl);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  try {
    const msg = {
      to: email, // Change to your recipient
      from: "johnpk1007@gmail.com", // Change to your verified sender
      template_id:
        lang === "en"
          ? process.env.SENDGRID_TEMPLATE_ID_DELETE_ENGLISH
          : process.env.SENDGRID_TEMPLATE_ID_DELETE_KOREAN,
      dynamic_template_data: {
        url: newUrl,
      },
    };

    sgMail
      .send(msg)
      .then((response) => {
        console.log("response:", response[0].statusCode);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const verifyEmail = async (req, res) => {
  console.log("verifyEmail module activated");
  console.log("req.body:", req.body);
  passport.authenticate("verify", (authError, user, info) => {
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
  })(req, res);
};
