import redis from "redis";

import dotenv from "dotenv";
dotenv.config();

const redisUsername = process.env.REDIS_USERNAME;
const redisPassword = process.env.REDIS_PASSWORD;
const redisEndpoint = process.env.REDIS_ENDPOINT;

const redisClient = redis.createClient({
  url: `redis://${redisUsername}:${redisPassword}@${redisEndpoint}/0`,
  legacymode: true,
});

// redisClient
//   .connect()
//   .then(() => console.log("Redis connected"))
//   .catch((error) => console.log("redisError:", error));

redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect();

export default redisClient;
