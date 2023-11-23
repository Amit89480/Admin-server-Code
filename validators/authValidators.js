const { z } = require("zod");

//creating an zod object for validating the user registration
const registerSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, { message: "Username must be atleast 3 characters long" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters long" }),
});

module.exports = { registerSchema };
