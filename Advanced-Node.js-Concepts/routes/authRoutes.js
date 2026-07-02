const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../validators/authValidator");
const validate = require("../middleware/validate");

// Register route
router.post("/register", registerValidation, validate, authController.register);

// Login route
router.post("/login", loginValidation, validate, authController.login);

module.exports = router;
