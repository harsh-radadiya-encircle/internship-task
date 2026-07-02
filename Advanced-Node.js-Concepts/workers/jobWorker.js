const { parentPort, workerData } = require("worker_threads");
const mongoose = require("mongoose");

// We dynamically import models to ensure Mongoose schema registry matches
const Comment = require("../models/Comment");
const Blog = require("../models/Blog");
const User = require("../models/User");

const run = async () => {
    const { name, data, mongoUri } = workerData;

    try {
        // Connect to MongoDB specifically inside this thread
        await mongoose.connect(mongoUri);

        if (name === "send_comment_notification") {
            const { commentId, blogId } = data;

            // Fetch comment and populate details
            const comment = await Comment.findById(commentId).populate("author", "name email");
            if (!comment) {
                throw new Error(`Comment not found: ${commentId}`);
            }

            const blog = await Blog.findById(blogId).populate("author", "name email");
            if (!blog) {
                throw new Error(`Blog not found: ${blogId}`);
            }

            const author = blog.author;
            if (!author || !author.email) {
                throw new Error(`Blog author email not found for blog ID: ${blogId}`);
            }

            console.log(`[Worker] Preparing comment notification email for ${author.email}...`);

            // Secure simulated email transmission logging details
            const emailContent = `
============================================================
[SECURE OUTBOX SIMULATION]
To: ${author.name} <${author.email}>
Subject: New Comment on your Post: "${blog.title}"
Date: ${new Date().toISOString()}

Dear ${author.name},

User "${comment.author.name}" (${comment.author.email}) commented on your blog post:
"${comment.content}"

Manage your post comments here: http://localhost:5000/api/blogs/${blog._id}/comments
============================================================
            `;
            console.log(emailContent);

            // Simulate minor sending latency
            await new Promise((resolve) => setTimeout(resolve, 1500));

            parentPort.postMessage({ success: true });
        } else if (name === "update_blog_stats") {
            const { blogId } = data;

            if (!blogId) {
                throw new Error("Missing blogId in update_blog_stats job");
            }

            // Count the comments for this blog
            const count = await Comment.countDocuments({ blog: blogId });

            // Update the blog count
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                { commentCount: count },
                { new: true }
            );

            if (!blog) {
                throw new Error(`Blog not found for stats update: ${blogId}`);
            }

            console.log(`[Worker] Updated comment count for "${blog.title}" to: ${count}`);

            // Simulate minor DB writing latency
            await new Promise((resolve) => setTimeout(resolve, 800));

            parentPort.postMessage({ success: true });
        } else {
            throw new Error(`Unknown job name: ${name}`);
        }
    } catch (error) {
        console.error(`[Worker Error] Job execution failed: ${error.message}`);
        parentPort.postMessage({ success: false, error: error.message });
    } finally {
        // Disconnect from MongoDB
        try {
            await mongoose.disconnect();
        } catch (dbErr) {
            console.error("[Worker] Error disconnecting DB:", dbErr);
        }
        process.exit(0);
    }
};

run();
