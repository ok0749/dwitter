import jwt from "jsonwebtoken";
import * as userReository from "../data/auth.js";
import { config } from "../config.js";

const AUTH_ERROR = { message: "Authentification Error" };

export const isAuth = async (req, res, next) => {
  // 1. Cookie (for Browser)
  // 2. Header (for Non-Browser Client)

  let token;
  // check the header
  const authHeader = req.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  // check the cookie
  if (!token) {
    token = req.cookies["token"];
  }
  // no header, no cookie
  if (!token) {
    console.log("no token");
    return res.status(401).json(AUTH_ERROR);
  }
  //   const authHeader = req.get("Authorization");
  //   if (!(authHeader && authHeader.startsWith("Bearer "))) {
  //     return res.status(401).json(AUTH_ERROR);
  //   }

  //   const token = authHeader.split(" ")[1];

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userReository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    req.token = token;
    next();
  });
};
