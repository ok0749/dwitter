import "express-async-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usersRepository from "../data/auth.js";
import { config } from "../config.js";

const jwtSecretkey = config.jwt.secretKey;
const jwtExpiresInDays = config.jwt.expiresInTime;
const bcryptSaultRounds = config.bcrypt.saltRounds;

export async function signup(req, res) {
  const { username, name, password, email, url } = req.body;
  const found = await usersRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} is already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaultRounds);
  const userID = await usersRepository.createUser({
    username,
    name,
    password: hashed,
    email,
    url,
  });
  const token = createJwtToken(userID);
  setToken(res, token);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await usersRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const token = createJwtToken(user.id);
  setToken(res, token);
  res.status(200).json({ token, username });
}

export async function logout(req, res, next) {
  res.cookie("token", "");
  res.status(200).json({ message: "User has been logged out" });
}

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInTime,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, options);
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretkey, { expiresIn: jwtExpiresInDays });
}

export async function me(req, res, next) {
  const user = await usersRepository.findById(req.userId);
  if (!user) {
    return res.status(401).json({ message: "user not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

export async function csrfToken(req, res, next) {
  const csrfToken = await generateCSRFToken();
  res.status(200).json({ csrfToken });
}

async function generateCSRFToken() {
  return bcrypt.hash(config.csrf.plainToken, 1);
}
