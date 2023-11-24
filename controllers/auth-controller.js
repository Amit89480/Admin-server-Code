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

  // here we are implementing the login funtionality with maxAteempts and lockUntil

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userExists = await User.findOne({ email });

      if (!userExists) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, userExists.password);

      console.log(userExists?.password);

      if (passwordMatch) {
        res.status(200).json({
          message: "Login Successful",
          token: await userExists.generateToken(),
          userId: userExists._id.toString(),
        });
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  },

  userRegistration: async (req, res, next) => {
    try {
      const { username, password, email, mobileNo, admin } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400).json({ message: "User already exists" });
      }

      // this is a way to secure password using bcryptjs

      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);

      const userCreated = await User.create({
        username,
        password,
        email,
        mobileNo,
        admin,
      });

      res.status(201).json({
        message: "User created successfully",
        userCreated,
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
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

  logout: async (req, res, next) => {
    try {
      const { email } = req.body;
      const emailExists = await User.findOne({ email });

      if (!emailExists) {
        return res.status(400).json({ message: "User does not exist" });
      }

      emailExists.loginAttempts = 0;
      await emailExists.save();

      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.log("Something went wrong");
    }
  },
  isLogin: async (req, res, next) => {
    try {
      const { userId } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userDetails = {
        username: user.username,
        email: user.email,
        mobileNo: user.mobileNo,
      };

      res.status(200).json({ message: "User is logged in", user: userDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
