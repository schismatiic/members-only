const { Router } = require("express");
const membershipRouter = Router();
const {
  getCreateMessage,
  createMessage,
  removeMessage,
  validateMessage,
} = require("../controllers/messageController");

membershipRouter.get("/create", getCreateMessage);
membershipRouter.post("/create", validateMessage, createMessage);
membershipRouter.get("/:id/delete", removeMessage);

module.exports = membershipRouter;
