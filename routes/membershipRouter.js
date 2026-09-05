const { Router } = require("express");
const membershipRouter = Router();
const {
  getBecome,
  createBecome,
  validateBecome,
} = require("../controllers/membershipController");

membershipRouter.get("/become", getBecome);
membershipRouter.post("/become", validateBecome, createBecome);

module.exports = membershipRouter;
