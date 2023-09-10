const express = require("express");
const server = express();
const actionsRouter = require("./actions/actions-router.js");
const projectsRouter = require("./projects/projects-router.js");

server.use(express.json());
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
