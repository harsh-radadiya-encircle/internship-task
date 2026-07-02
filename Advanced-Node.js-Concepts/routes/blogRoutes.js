const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");
const { blogValidation } = require("../validators/blogValidator");
const validate = require("../middleware/validate");
const commentRoutes = require("./commentRoutes");

// Get background jobs logs (Helper route for monitoring dashboard)
router.get("/jobs/logs", commentController.getJobLogs);

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

// Nest comments routes under blogs
router.use("/:blogId/comments", commentRoutes);

module.exports = router;
