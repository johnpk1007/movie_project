import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import redisClient from "../models/redis.js";

const verify = (token) => {
  try {
    return jwt.verify(token, "test");
  } catch (error) {
    return error.message;
  }
};

const auth = async (req, res, next) => {
  try {
    // if(req.headers.authorization === undefined) throw Error("You have no authority")
    //no token = jwt malformed
    //expire token = jwt expired
    //wrong token = invalid signature
    //no refreshToken = jwt must be provided

    const accessToken = verify(req.headers.authorization.split(" ")[1]);
    const refreshToken = verify(req.cookies.refreshToken);
    console.log("accessToken:", accessToken);
    console.log("refreshToken:", refreshToken);

    if (accessToken === "jwt malformed") {
      console.log("accessToken is undefined");
      if (refreshToken === "jwt must be provided") {
        console.log("refresh token does not exist");
        res.status(403).json({
          message: "accessToken is undefined and refresh token does not exist",
        });
      } else if (refreshToken === "jwt expired") {
        console.log("refresh token is expired");
        const { email } = jwt_decode(req.cookies.refreshToken);
        const redisRefreshToken = await redisClient.get(email);
        if (req.cookies.refreshToken !== redisRefreshToken) {
          console.log("it is mismatch");
          return res.status(401).json({
            message: "accessToken is undefined and refresh token is invalid",
          });
        }
        const refreshToken = jwt.sign({ email: email }, "test", {
          expiresIn: "14d",
        });
        res.cookie("refreshToken", refreshToken);
        await redisClient.set(email, refreshToken);
        const token = jwt.sign({ email: email }, "test", { expiresIn: "5m" });
        res.status(401).json({ token });
      } else if (refreshToken === "invalid signature") {
        console.log("refresh token is invalid");
        res.status(403).json({
          message: "accessToken is undefined and refresh token is invalid",
        });
      } else {
        console.log("refresh token is okay");
        const { email } = refreshToken;
        const redisRefreshToken = await redisClient.get(email);
        if (req.cookies.refreshToken !== redisRefreshToken) {
          console.log("it is mismatch");
          return res.status(401).json({
            message: "accessToken is undefined and refresh token is invalid",
          });
        }
        console.log("email:", email);
        const token = jwt.sign({ email: email }, "test", { expiresIn: "5m" });
        res.status(401).json({ token });
      }
    } else if (accessToken === "jwt expired") {
      console.log("accessToken is expired");
      if (refreshToken === "jwt must be provided") {
        console.log("refresh token does not exist");
        res.status(403).json({
          message: "accessToken is expired and refresh token does not exist",
        });
      } else if (refreshToken === "jwt expired") {
        console.log("refresh token is expired");
        const { email } = jwt_decode(req.cookies.refreshToken);
        const redisRefreshToken = await redisClient.get(email);
        if (req.cookies.refreshToken !== redisRefreshToken) {
          console.log("it is mismatch");
          return res.status(403).json({
            message: "accessToken is undefined and refresh token is invalid",
          });
        }
        const refreshToken = jwt.sign({ email: email }, "test", {
          expiresIn: "14d",
        });
        await redisClient.set(email, refreshToken);
        res.cookie("refreshToken", refreshToken);
        const token = jwt.sign({ email: email }, "test", { expiresIn: "5m" });
        res.status(401).json({ token });
      } else if (refreshToken === "invalid signature") {
        console.log("refresh token is invalid");
        res.status(403).json({
          message: "accessToken is expired and refresh token is invalid",
        });
      } else {
        console.log("refresh token is okay");
        const { email } = refreshToken;
        console.log("email:", email);
        const redisRefreshToken = await redisClient.get(email);
        if (req.cookies.refreshToken !== redisRefreshToken) {
          console.log("it is mismatch");
          return res.status(403).json({
            message: "accessToken is expired and refresh token is invalid",
          });
        }
        const token = jwt.sign({ email: email }, "test", { expiresIn: "5m" });
        res.status(401).json({ token });
      }
    } else if (accessToken === "invalid signature") {
      console.log("accessToken is invalid");
      if (refreshToken === "jwt must be provided") {
        console.log("refresh token does not exist");
        res.status(403).json({
          message: "accessToken is invalid and refresh token does not exist",
        });
      } else if (refreshToken === "jwt expired") {
        console.log("refresh token is expired");
        res.status(403).json({
          message: "accessToken is invalid and refresh token is expired",
        });
      } else if (refreshToken === "invalid signature") {
        console.log("refresh token is invalid");
        res.status(403).json({
          message: "accessToken is invalid and refresh token is invalid",
        });
      } else {
        console.log("refresh token is okay");
        res.status(403).json({
          message: "refresh token is okay but accessToken is invalid",
        });
      }
    } else {
      console.log("accessToken is okay");
      if (refreshToken === "jwt must be provided") {
        console.log("refresh token does not exist");
        res.status(403).json({
          message: "accessToken is okay but refresh token does not exist",
        });
      } else if (refreshToken === "jwt expired") {
        console.log("refresh token is expired");
        const { email } = jwt_decode(req.cookies.refreshToken);
        const redisRefreshToken = await redisClient.get(email);
        if (req.cookies.refreshToken !== redisRefreshToken) {
          console.log("it is mismatch");
          return res.status(403).json({
            message: "accessToken is okay but refresh token is invalid",
          });
        }
        const refreshToken = jwt.sign({ email: email }, "test", {
          expiresIn: "14d",
        });
        await redisClient.set(email, refreshToken);
        res.cookie("refreshToken", refreshToken);
        const token = jwt.sign({ email: email }, "test", { expiresIn: "30s" });
        res.status(401).json({ token });
      } else if (refreshToken === "invalid signature") {
        console.log("refresh token is invalid");
        res.status(403).json({
          message: "accessToken is okay but refresh token is invalid",
        });
      } else {
        console.log("refresh token is okay");
        next();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// const auth = async (req, res, next) => {
//   try {
//     let token;
//     let decodedData;
//     if (req.headers.authorization.startsWith("bearer.")) {
//       token = req.headers.authorization.split(".")[1];
//       console.log("token", token);
//       decodedData = await axios.get("https://openapi.naver.com/v1/nid/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(decodedData);
//       console.log(decodedData.data.response);
//       req.userId = decodedData.data.response.id;
//     } else {
//       token = req.headers.authorization.split(" ")[1];
//       const isCustomAuth = token.length < 500;
//       if (token && isCustomAuth) {
//         console.log("it is custom");
//         decodedData = jwt.verify(token, "test");
//         req.userId = decodedData?.id;
//         req.token = token;
//         res.set("token", token);
//       } else {
//         console.log("it is google oauth");
//         decodedData = jwt.decode(token);
//         req.userId = decodedData?.sub;
//       }
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

export default auth;
