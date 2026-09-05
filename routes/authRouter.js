const { Router } = require("express");
const authRouter = Router();

const {
  getSignUp,
  getLogIn,
  getLogOut,
  createLogIn,
  createSignUp,
  validateCreateAccount,
  validateLogIn,
  handleLogInValidation,
} = require("../controllers/authController");

authRouter.get("/sign-up", getSignUp);
authRouter.post("/sign-up", validateCreateAccount, createSignUp);
authRouter.get("/log-in", getLogIn);
authRouter.post("/log-in", validateLogIn, handleLogInValidation, createLogIn);
authRouter.get("/log-out", getLogOut);

module.exports = authRouter;
