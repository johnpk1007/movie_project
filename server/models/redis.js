import redis from "redis";

import dotenv from "dotenv";
dotenv.config();

const redisUsername = process.env.REDIS_USERNAME;
const redisPassword = process.env.REDIS_PASSWORD;
const redisEndpoint = process.env.REDIS_ENDPOINT;

const redisClient = redis.createClient({
  url: `redis://${redisUsername}:${redisPassword}@${redisEndpoint}/0`,
  socket: {
    connectTimeout: 100000,
  },
});

redisClient
  .connect()
  .then(() => console.log("Redis connected"))
  .catch((error) => console.log("redisError:", error));

export default redisClient;
