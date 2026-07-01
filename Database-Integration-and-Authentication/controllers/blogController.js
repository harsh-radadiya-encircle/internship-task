const Blog = require("../models/Blog");

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private
exports.createBlog = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        const blog = await Blog.create({
            title,
            content,
            author: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: blogs.length,
            blogs,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email");

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({
            success: true,
            blog,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        // Check if the authenticated user is the author
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this blog",
            });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;

        const updatedBlog = await blog.save();

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog: updatedBlog,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        // Check if the authenticated user is the author
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this blog",
            });
        }

        await blog.deleteOne();

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
