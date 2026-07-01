const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const { blogValidation } = require("../validators/blogValidator");
const validate = require("../middleware/validate");

// Create blog (Private)
router.post("/", authMiddleware, blogValidation, validate, blogController.createBlog);

// Get all blogs (Public)
router.get("/", blogController.getAllBlogs);

// Get single blog by ID (Public)
router.get("/:id", blogController.getBlogById);

// Update blog (Private)
router.put("/:id", authMiddleware, blogValidation, validate, blogController.updateBlog);

// Delete blog (Private)
router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
