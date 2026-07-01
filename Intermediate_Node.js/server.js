const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
    let filePath;

    if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
    } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
    } else {
        filePath = path.join(__dirname, "public", req.url);
    }

    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === "ENOENT") {
                res.writeHead(404, {
                    "Content-Type": "text/html",
                });

                res.end(`
          <h1>404 - Page Not Found</h1>
          <p>The page you requested does not exist.</p>
        `);
            } else {
                res.writeHead(500, {
                    "Content-Type": "text/plain",
                });

                res.end("Internal Server Error");
            }
        } else {
            res.writeHead(200, {
                "Content-Type": contentType,
            });

            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});