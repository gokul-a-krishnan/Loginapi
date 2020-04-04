const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const homeRoute = require("./routes/home");
const verifyRoute = require("./routes/verify_auth");

dotenv.config();
const port = 441;
const db_host = process.env.db_host;
const db_user = process.env.db_user;
const db_password = process.env.db_password;
const db_name = "prod";

const app = express();
app.use(bodyParser.json());
app.use("/api/user", authRoute);
app.use("/api/home", homeRoute);
app.use("/api/verify", verifyRoute);

mongoose.connect(
  `mongodb+srv://${db_user}:${db_password}@${db_host}/${db_name}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(err.message);
      console.log("Can't start server since can't connect to database");
    } else {
      console.log("Db connected successfully");
      https
        .createServer(
          {
            pfx: fs.readFileSync("ssl.pfx"),
            passphrase: process.env.ssl_key
          },
          app
        )
        .listen(port, () => {
          console.log(`server started at ${port}`);
        });
    }
  }
);
