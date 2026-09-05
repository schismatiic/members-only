const { Router } = require("express");
const authRouter = Router();

const {
  getSignUp,
  createSignUp,
  validateCreateAccount,
} = require("../controllers/authController");

authRouter.get("/", getSignUp);
authRouter.post("/", validateCreateAccount, createSignUp);

module.exports = authRouter;
