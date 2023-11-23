const express = require("express");
const authControllers = require("../controllers/auth-controller");
const router = express.Router();
const {
  validateMiddleware,
} = require("../validateMiddleware.js/validateMiddleware");
const { registerSchema } = require("../validators/authValidators");

//here we are setting up and doing the routes
router.route("/").get(authControllers.homePage);
router
  .route("/register")
  .post(validateMiddleware(registerSchema), authControllers.userRegistration);
router.route("/login").post(authControllers.login);
router.route("/delete").delete(authControllers.userDelete);
router.route("/logout").post(authControllers.logout);
router.route("/Islogin").post(authControllers.isLogin);

module.exports = router;
