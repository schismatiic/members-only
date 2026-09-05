const { Router } = require("express");
const membershipRouter = Router();
const { getBecome } = require("../controllers/membershipController");

membershipRouter.get("/become", getBecome);

module.exports = membershipRouter;
