const User = require("../models/usermodels");
const bcrypt = require("bcryptjs");

module.exports = {
  homePage: async (req, res, next) => {
    try {
      res.status(200).send("Welcome to the home page from controller!");
    } catch (error) {
      console.log(error);
    }
  },

  userRegistration: async (req, res, next) => {
    try {
      const { name, password, email, mobileNo, admin } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400).json({ message: "User already exists" });
      }

      // this is a way to secure password using bcryptjs

      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);

      const userCreated = await User.create({
        name,
        password,
        email,
        mobileNo,
      });

      res.status(201).json({
        message: "User created successfully",
        userCreated,
        token:await userCreated.generateToken(),
        userId:userCreated._id.toString()
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  },

  userDelete: async (req, res, next) => {
    try {
      const { email } = req.body;
      const emailExists = await User.findOne({ email });

      if (!emailExists) {
        return res.status(400).json({ message: "User does not exist" });
      }
      await User.findOneAndDelete({ email });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  },
};
