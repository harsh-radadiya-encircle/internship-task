const express = require("express");
// mergeParams is required to capture the blogId from the parent router
const router = express.Router({ mergeParams: true });

const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");
const { commentValidation } = require("../validators/commentValidator");
const validate = require("../middleware/validate");

// POST /api/blogs/:blogId/comments (Private)
router.post("/", authMiddleware, commentValidation, validate, commentController.createComment);

// GET /api/blogs/:blogId/comments (Public)
router.get("/", commentController.getComments);

module.exports = router;
