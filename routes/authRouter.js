const { Router } = require("express");
const authRouter = Router();

const { getSignUp } = require("../controllers/authController");

authRouter.get("/", getSignUp);

module.exports = authRouter;
