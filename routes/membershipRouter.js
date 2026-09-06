const { Router } = require("express");
const membershipRouter = Router();
const {
  getBecome,
  getAdmin,
  createBecome,
  createAdmin,
  validateBecome,
  validateAdmin,
} = require("../controllers/membershipController");

membershipRouter.get("/become", getBecome);
membershipRouter.post("/become", validateBecome, createBecome);
membershipRouter.get("/admin", getAdmin);
membershipRouter.post("/admin", validateAdmin, createAdmin);

module.exports = membershipRouter;
