const db = require("../db/queries");

const getMessages = async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", { messages, user: req.user });
};

module.exports = { getMessages };
