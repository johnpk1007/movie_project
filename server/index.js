import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import emailRoutes from "./routes/email.js";
import session from "express-session";
import passport from "passport";
import index from "./passport/index.js";

import RedisStore from "connect-redis";

import redisClient from "./models/redis.js";

const app = express();
dotenv.config();

const whitelist = [process.env.FRONTEND_ADDRESS];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed origin"));
    }
  },
  credentials: true,
};

let redisStore = new RedisStore({
  client: redisClient,
  // host: "redis-19603.c302.asia-northeast1-1.gce.cloud.redislabs.com",
  // port: 19603,
  prefix: "filmView",
});

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

// app.use(session({ secret: "test", resave: false, saveUninitialized: false }));
app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: "real secret",
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    // },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

index();

app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Memories API!");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));
