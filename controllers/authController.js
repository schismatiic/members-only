const db = require("../db/queries");
const passport = require("../passport/passport");
const bcrypt = require("bcryptjs");
const { body, validationResult, matchedData } = require("express-validator");

const lengthErr = "must be between 1 and 25 characters.";
const lengthErr2 = "must be at least 5 characters.";
const validateCreateAccount = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 25 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 25 })
    .withMessage(`Last name ${lengthErr}`),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 25 })
    .custom(async (value) => {
      const user = await db.getUsername(value);
      if (user) {
        throw new Error("Username already in use");
      }
    })
    .withMessage("Username already in use"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await db.getEmail(value);
      if (user) {
        throw new Error("Email already in use");
      }
    })
    .withMessage("Email already in use"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 5 })
    .withMessage(`Password ${lengthErr2}`),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required.")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),
];
const validateLogIn = [
  body("identifier")
    .trim()
    .notEmpty()
    .withMessage("Username or email is required"),
  body("password").trim().notEmpty().withMessage("Password is required."),
];
const handleLogInValidation = (req, res, next) => {
  const user = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("log-in", {
      errors: errors.array(),
      identifier: user.identifier,
    });
  }
  next();
};

const getSignUp = (req, res) => {
  res.render("sign-up", {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
};
const getLogIn = (req, res) => {
  res.render("log-in", {
    identifier: "",
  });
};
const getLogOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
const createLogIn = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/log-in",
  failureMessage: true,
});
const createSignUp = async (req, res) => {
  const user = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", {
      errors: errors.array(),
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
    });
  }
  const { firstName, lastName, username, email, password } = matchedData(req);
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.createSignUp(firstName, lastName, username, email, hashedPassword);
  res.redirect("/");
};

module.exports = {
  getSignUp,
  getLogIn,
  getLogOut,
  createLogIn,
  createSignUp,
  validateCreateAccount,
  validateLogIn,
  handleLogInValidation,
};
