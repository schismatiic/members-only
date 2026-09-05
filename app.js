const path = require("node:path");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("./passport/passport");

const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

process.loadEnvFile();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/", indexRouter);

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("App listening on port 3000!");
});
