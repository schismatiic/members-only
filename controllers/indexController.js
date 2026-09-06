const db = require("../db/queries");

const getMessages = async (req, res) => {
  const messages = await db.getAllMessages();
  const formattedMessages = messages.map((message) => ({
    ...message,
    added: message.added
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\//g, "/")
      .replace(", ", " - "),
  }));
  res.render("index", { messages: formattedMessages, user: req.user });
};

module.exports = { getMessages };
