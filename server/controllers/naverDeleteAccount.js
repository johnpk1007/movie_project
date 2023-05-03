import User from "../models/user.js";
import PostMessage from "../models/postMessage.js";
import redisClient from "../models/redis.js";
import axios from "axios";

// export const naverDeleteAccount = async (id, src) => {
export const naverDeleteAccount = async (req, res) => {
  const { creatorId: id, src } = req.body;
  const clientId = process.env.CLIENT_ID_NAVER;
  const clientSecret = process.env.CLIENT_SECRET_NAVER;
  const user = await User.findOneAndDelete({ id, src });
  console.log("user:", user);
  if (user === null) return console.log("user doesn't exist");

  await PostMessage.updateMany(
    { "comments.id": id },
    { $pull: { comments: { id: id } } }
  );
  await PostMessage.deleteMany({ creator: id });

  const redisRefreshToken = await redisClient.get(id);
  console.log("redisRefreshToken:", redisRefreshToken);
  const naverAccessToken = await axios.get(
    `https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${redisRefreshToken}`
  );
  console.log("naverAccessToken:", naverAccessToken.data.access_token);
  const urlEncodedAccessToken = encodeURIComponent(
    naverAccessToken.data.access_token
  );
  console.log("urlEncoded:", urlEncodedAccessToken);
  const result = await axios.get(
    `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${clientId}&client_secret=${clientSecret}&access_token=${urlEncodedAccessToken}&service_provider=NAVER`
  );
  console.log(result.data);
  res.json({ message: "User deleted successfully" });
};
