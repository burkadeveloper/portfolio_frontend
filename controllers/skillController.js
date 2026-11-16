const Skill = require("../models/Skill");
const { sanitizeSkill } = require("../utils/sanitize");

exports.getSkills = async (req, res, next) => {
  try {
    res.json(await Skill.find().sort({ order: 1, name: 1 }));
  } catch (err) {
    next(err);
  }
};

exports.createSkill = async (req, res, next) => {
  try {
    console.log("📥 [createSkill] raw:", req.body);
    const data = sanitizeSkill(req.body);
    const skill = await Skill.create(data);
    console.log("✅ [createSkill]", skill._id);
    res.status(201).json(skill);
  } catch (err) {
    console.error("❌ [createSkill]", err.name, "-", err.message);
    next(err);
  }
};

exports.updateSkill = async (req, res, next) => {
  try {
    console.log("📥 [updateSkill]", req.params.id, "raw:", req.body);
    const data = sanitizeSkill(req.body);
    const skill = await Skill.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!skill) {
      res.status(404);
      throw new Error("Skill not found");
    }
    console.log("✅ [updateSkill]", skill._id);
    res.json(skill);
  } catch (err) {
    console.error("❌ [updateSkill]", err.name, "-", err.message);
    next(err);
  }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      res.status(404);
      throw new Error("Skill not found");
    }
    res.json({ message: "Skill deleted" });
  } catch (err) {
    next(err);
  }
};
