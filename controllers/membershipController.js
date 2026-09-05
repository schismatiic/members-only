const db = require("../db/queries");

const getBecome = (req, res) => {
  res.render("become", { user: req.user });
};

module.exports = { getBecome };
