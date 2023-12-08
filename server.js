require("dotenv").config();
const express = require("express");
const router = require("./router/auth-router");
const connectDb = require("./utils/connection");
const { configDotenv } = require("dotenv");
const cors = require("cors");


//this is where we are setting up the app
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());


//here we are using the middleware

app.use(express.json());


//this is where we are mounting the route
app.use("/api/auth", router);

connectDb().then(() => {
  //setting up port
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
