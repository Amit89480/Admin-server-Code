const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },

  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

//here we are writting code for hashing password
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});

//json web token in detailed setup
userSchema.methods.generateToken =async function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      mobileNo: this.mobileNo,
      admin: this.admin,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h"}

  );
  return token;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
