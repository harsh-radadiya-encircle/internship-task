const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

let blogs = [];

// Create Blog
app.post("/blogs", (req, res) => {
    const { title, author, content } = req.body;

    const newBlog = {
        id: blogs.length + 1,
        title,
        author,
        content
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog Created Successfully",
        blog: newBlog
    });
});

// Get All Blogs
app.get("/blogs", (req, res) => {
    res.json({
        total: blogs.length,
        blogs
    });
});

// Get Single Blog
app.get("/blogs/:id", (req, res) => {
    const id = Number(req.params.id);

    const blog = blogs.find(blog => blog.id === id);

    if (!blog) {
        return res.status(404).json({
            message: "Blog Not Found"
        });
    }

    res.json(blog);
});

// Update Blog
app.put("/blogs/:id", (req, res) => {
    const id = Number(req.params.id);

    const blog = blogs.find(blog => blog.id === id);

    if (!blog) {
        return res.status(404).json({
            message: "Blog Not Found"
        });
    }

    const { title, author, content } = req.body;

    blog.title = title;
    blog.author = author;
    blog.content = content;

    res.json({
        message: "Blog Updated Successfully",
        blog
    });
});

// Delete Blog
app.delete("/blogs/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = blogs.findIndex(blog => blog.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Blog Not Found"
        });
    }

    blogs.splice(index, 1);

    res.json({
        message: "Blog Deleted Successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});