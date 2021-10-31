import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import * as userController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateCredential = [
  body("username")
    .trim()
    .isLength({ min: 5 })
    .withMessage("username should be at least 5 characters"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("password should be at least 5 characters"),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body("name").trim().notEmpty().withMessage("name is missing"),
  body("email").isEmail().normalizeEmail().withMessage("invalid email"),
  body("url")
    .isURL()
    .withMessage("invalid url")
    .optional({ nullable: true, checkFalsy: true }), // null, false 도 okay
  validate,
];

// sign up -> post
router.post("/signup", validateSignup, userController.signup);

// login -> post
router.post("/login", validateCredential, userController.login);

router.post("/logout", userController.logout);

// me
router.get("/me", isAuth, userController.me);

router.get("/csrf-token", userController.csrfToken);

export default router;
