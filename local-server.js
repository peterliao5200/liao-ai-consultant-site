const fs = require("fs");
const http = require("http");
const path = require("path");

const root = __dirname;
const startPort = Number(process.argv[2] || 8787);
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

function sendFile(res, filePath) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { "content-type": mimeTypes[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
}

function createServer(port) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    const requested = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname.slice(1));
    const filePath = path.resolve(root, requested);

    if (!filePath.startsWith(root)) {
      res.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
      res.end("Forbidden");
      return;
    }

    sendFile(res, filePath);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && port < startPort + 20) {
      createServer(port + 1);
      return;
    }
    throw error;
  });

  server.listen(port, "127.0.0.1", () => {
    const url = `http://127.0.0.1:${port}/`;
    fs.writeFileSync(path.join(root, ".preview-url.txt"), url, "utf8");
    console.log(`Preview server running at ${url}`);
  });
}

createServer(startPort);
