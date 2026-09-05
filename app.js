const path = require("node:path");
const express = require("express");
const app = express();

const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/sign-up", authRouter);
app.use("/", indexRouter);

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("App listening on port 3000!");
});
