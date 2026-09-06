const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

process.loadEnvFile();

const validateBecome = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Membership password is required.")
    .custom((value) => {
      if (value !== process.env.MEMBER_PASSWORD) {
        throw new Error("Incorrect membership password.");
      }
      return true;
    }),
];
const validateAdmin = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Admin password is required.")
    .custom((value) => {
      if (value !== process.env.ADMIN_PASSWORD) {
        throw new Error("Incorrect admin password.");
      }
      return true;
    }),
];
const getBecome = (req, res) => {
  res.render("become", { user: req.user });
};
const getAdmin = (req, res) => {
  res.render("admin", { user: req.user });
};
const createBecome = async (req, res) => {
  const id = req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("become", {
      errors: errors.array(),
    });
  }
  await db.updateMembership(id);
  res.redirect("/");
};
const createAdmin = async (req, res) => {
  const id = req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("admin", {
      errors: errors.array(),
    });
  }
  await db.updateAdmin(id);
  res.redirect("/");
};

module.exports = {
  getBecome,
  getAdmin,
  createBecome,
  createAdmin,
  validateBecome,
  validateAdmin,
};
