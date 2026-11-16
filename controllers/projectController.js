const Project = require("../models/Project");
const { sanitizeProject } = require("../utils/sanitize");

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    console.log("📥 [createProject] raw body:", req.body);
    const data = sanitizeProject(req.body);
    console.log("📥 [createProject] sanitized:", data);
    const project = await Project.create(data);
    console.log("✅ [createProject] saved:", project._id);
    res.status(201).json(project);
  } catch (err) {
    console.error("❌ [createProject]", err.name, "-", err.message);
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    console.log("📥 [updateProject]", req.params.id, "raw:", req.body);
    const data = sanitizeProject(req.body);
    console.log("📥 [updateProject] sanitized:", data);
    const project = await Project.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    console.log("✅ [updateProject] saved:", project._id);
    res.json(project);
  } catch (err) {
    console.error("❌ [updateProject]", err.name, "-", err.message);
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    console.log("🗑️ [deleteProject]", req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    next(err);
  }
};
