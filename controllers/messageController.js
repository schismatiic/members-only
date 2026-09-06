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
  res.render("create-message", { title: "", message: "", user: req.user });
};
const createMessage = async (req, res) => {
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

module.exports = { getCreateMessage, createMessage, validateMessage };
