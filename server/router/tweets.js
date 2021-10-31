import express from "express";
import { body, validationResult } from "express-validator";
import "express-async-errors";
import * as tweetsController from "../controller/tweets.js";
import { validate } from "../middleware/validate.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateTweet = [
  body("text").trim().notEmpty().withMessage("내용을 입력하세요"),
  validate,
];

router.get("/", isAuth, tweetsController.getTweets);

router.get("/:id", isAuth, tweetsController.getById);

router.post("/", isAuth, validateTweet, tweetsController.create);

router.put("/:id", isAuth, validateTweet, tweetsController.update);

router.delete("/:id", isAuth, tweetsController.remove);

export default router;
