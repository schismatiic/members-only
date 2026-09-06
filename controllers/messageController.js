const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const lengthErr = "must be between 1 and 25 characters.";
const lengthErr2 = "must be between 1 and 500 characters.";
const validateMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 25 })
    .withMessage(`Title ${lengthErr}`),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ max: 500 })
    .withMessage(`Message ${lengthErr2}`),
];

const getCreateMessage = (req, res) => {
  if (!req.user || !req.user.membership_status) {
    return res.status(403).send("Forbidden");
  }
  res.render("create-message", { title: "", message: "", user: req.user });
};
const createMessage = async (req, res) => {
  if (!req.user || !req.user.membership_status) {
    return res.status(403).send("Forbidden");
  }
  const msg = req.body;
  const user = req.user;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", {
      errors: errors.array(),
      title: msg.title,
      message: msg.message,
      user,
    });
  }
  const { title, message } = matchedData(req);
  await db.createMessage(title, message, user.id);
  res.redirect("/");
};
const removeMessage = async (req, res) => {
  if (!req.user || !req.user.admin_status) {
    return res.status(403).send("Forbidden");
  }
  const { id } = req.params;
  await db.removeMessage(id);
  res.redirect("/");
};

module.exports = {
  getCreateMessage,
  createMessage,
  removeMessage,
  validateMessage,
};
