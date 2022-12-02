import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

export const auth = async (req, res) => {
  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    console.log(tokens);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
