const { Router } = require("express");
const membershipRouter = Router();
const {
  getCreateMessage,
  createMessage,
  validateMessage,
} = require("../controllers/messageController");

membershipRouter.get("/create", getCreateMessage);
membershipRouter.post("/create", validateMessage, createMessage);

module.exports = membershipRouter;
