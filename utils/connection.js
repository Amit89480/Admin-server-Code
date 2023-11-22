const mongoose = require("mongoose");

const dburl =
process.env.MONGODBURI;

const connectDb = async () => {
  try {
    await mongoose.connect(dburl);
    console.log("Database connection successful");
  } catch (error) {
    console.log("500 Internal server error");
    process.exit(0);
  }
};

module.exports = connectDb;
