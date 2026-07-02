const Comment = require("../models/Comment");
const Blog = require("../models/Blog");
const Job = require("../models/Job");
const { getIO } = require("../config/socket");

// @desc    Create a new comment on a blog post
// @route   POST /api/blogs/:blogId/comments
// @access  Private
exports.createComment = async (req, res, next) => {
    try {
        const { content } = req.body;
        const { blogId } = req.params;

        // Check if blog exists
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found",
            });
        }

        // Create comment in DB
        let comment = await Comment.create({
            content,
            blog: blogId,
            author: req.user.id,
        });

        // Populate author information (name, email)
        comment = await comment.populate("author", "name email");

        // 1. REAL-TIME BROADCAST: Emit newComment event to Room "blog:blogId"
        try {
            const io = getIO();
            io.to(`blog:${blogId}`).emit("newComment", comment);
            console.log(`[Socket] Broadcasted new comment to room blog:${blogId}`);
        } catch (socketErr) {
            console.error(`[Socket Error] Could not broadcast comment: ${socketErr.message}`);
        }

        // 2. SECURE BACKGROUND TASK 1: Queue email notification for blog author
        await Job.create({
            name: "send_comment_notification",
            data: {
                commentId: comment._id.toString(),
                blogId: blogId,
            },
        });

        // 3. SECURE BACKGROUND TASK 2: Queue blog comment statistics update
        await Job.create({
            name: "update_blog_stats",
            data: {
                blogId: blogId,
            },
        });

        res.status(201).json({
            success: true,
            message: "Comment added successfully and background tasks queued.",
            comment,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get comments for a blog post
// @route   GET /api/blogs/:blogId/comments
// @access  Public
exports.getComments = async (req, res, next) => {
    try {
        const { blogId } = req.params;

        // Verify blog exists
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found",
            });
        }

        // Retrieve and populate comments
        const comments = await Comment.find({ blog: blogId })
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            comments,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get background jobs (Helper endpoint for frontend dashboard testing)
// @route   GET /api/blogs/jobs/logs
// @access  Public
exports.getJobLogs = async (req, res, next) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json({
            success: true,
            jobs,
        });
    } catch (error) {
        next(error);
    }
};
