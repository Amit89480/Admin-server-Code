const express = require("express");
const authControllers = require("../controllers/auth-controller");
const router = express.Router();




//here we are setting up and doing the routes
router.route("/").get(authControllers.homePage);
router.route("/register").post(authControllers.userRegistration);
router.route("/delete").delete(authControllers.userDelete);

module.exports = router;
