// add middlewares here related to projects

const Projects = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateProject(req, res, next) {
  const { name, description, completed } = req.body;
  if (!name || !description || completed === undefined) {
    res.status(400).json({
      message: "missing required name and description field",
    });
  } else {
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProject,
};
