// Write your "projects" router here!

const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();
const { validateProjectId, validateProject } = require("./projects-middleware");

router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateProjectId, async (req, res, next) => {
  try {
    const project = req.project;
    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
    } else {
      res.status(200).json(project);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", async (req, res, next) => {
  try {
    const project = await Projects.getProjectActions(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
    } else {
      res.status(200).json(project);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", validateProject, async (req, res, next) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateProject, async (req, res, next) => {
  try {
    const project = await Projects.update(req.params.id, req.body);
    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
    } else {
      res.status(200).json(project);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const project = await Projects.remove(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
    } else {
      res.status(200);
      next();
    }
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Something bad inside the projects router!",
  });
});

module.exports = router;
