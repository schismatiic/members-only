const { Router } = require("express");
const indexRouter = Router();

const { getMessages } = require("../controllers/indexController");

indexRouter.get("/", getMessages);

module.exports = indexRouter;
