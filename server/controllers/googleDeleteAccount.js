import { google } from "googleapis";
import User from "../models/user.js";
import PostMessage from "../models/postMessage.js";
import redisClient from "../models/redis.js";
import dotenv from "dotenv";
dotenv.config();

const backend = process.env.BACKEND_ADDRESS;
const url = backend + "/users/googlecallback";

export const googleDeleteAccount = async (id, src) => {
  const clientId = process.env.CLIENT_ID_GOOGLE;
  const clientSecret = process.env.CLIENT_SECRET_GOOGLE;
  const redirectURI = url;

  const user = await User.findOneAndDelete({ id, src });

  if (user === null) return console.log("user doesn't exist");

  await PostMessage.updateMany(
    { "comments.id": id },
    { $pull: { comments: { id: id } } }
  );
  await PostMessage.deleteMany({ creator: id });

  const redisRefreshToken = await redisClient.get(id);

  console.log("redisRefreshToken:", redisRefreshToken);

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectURI
  );

  oauth2Client.setCredentials({
    refresh_token: redisRefreshToken,
  });

  oauth2Client.refreshAccessToken((err, tokens) => {
    oauth2Client.revokeToken(tokens.access_token);
  });
};
