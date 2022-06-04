const path = require("path");
const express = require("express");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const { connenctDB } = require("./config/db");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;
connenctDB();
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// serve front
// if you dont want to production comment these code below and change  NODE_ENV to development
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("please set NODE_ENV to production"));
}
//
app.use(errorHandler);

app.listen(port, () => console.log(`server listen on port ${port}`));
